document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully");

    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("quoteFormContainer");
    const quoteForm = document.getElementById("quoteForm");

    if (showFormButton && formContainer) {
        showFormButton.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Button clicked!");
            formContainer.style.display =
                formContainer.style.display === "none" || formContainer.style.display === ""
                    ? "block"
                    : "none";
        });
    } else {
        console.error("showForm or quoteFormContainer not found!");
    }

    if (quoteForm) {
        quoteForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            const formData = new FormData(quoteForm);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            try {
                const response = await fetch("http://192.168.1.100:8000/send-email/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData),
                });

                if (response.ok) {
                    console.log("Email sent successfully!");
                } else {
                    throw new Error("Backend unavailable, saving request locally.");
                }
            } catch (error) {
                console.error(error);
                saveRequestOffline(jsonData);
            }
        });
    }

    // Save request to IndexedDB
    function saveRequestOffline(data) {
        const requestQueue = JSON.parse(localStorage.getItem("pendingRequests")) || [];
        requestQueue.push(data);
        localStorage.setItem("pendingRequests", JSON.stringify(requestQueue));
    }

    // Retry requests when backend is available
    async function retryRequests() {
        const requestQueue = JSON.parse(localStorage.getItem("pendingRequests")) || [];

        if (requestQueue.length > 0) {
            console.log(`Retrying ${requestQueue.length} stored requests...`);
            for (let i = 0; i < requestQueue.length; i++) {
                try {
                    const response = await fetch("http://192.168.1.100:8000/send-email/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(requestQueue[i]),
                    });

                    if (response.ok) {
                        console.log("Stored request sent successfully!");
                        requestQueue.splice(i, 1);
                        i--; // Adjust index after removing item
                    }
                } catch (error) {
                    console.error("Backend still down, keeping requests stored.");
                    break; // Stop retrying if backend is still unavailable
                }
            }
            localStorage.setItem("pendingRequests", JSON.stringify(requestQueue));
        }
    }

    // Retry every 30 seconds
    setInterval(retryRequests, 30000);
});
