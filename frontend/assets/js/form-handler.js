document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully");

    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("quoteFormContainer");
    const quoteForm = document.getElementById("quoteForm");
    let hasAttempted = false; // Prevent multiple submissions

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
        quoteForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (hasAttempted) {
                console.log("Request already sent or in progress. Ignoring duplicate attempt.");
                return;
            }

            hasAttempted = true; // Prevents multiple requests

            console.log("Form submitted. Waiting 50 seconds before sending...");

            setTimeout(async function () {
                const formData = new FormData(quoteForm);
                const jsonData = {};
                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });

                try {
                    const response = await fetch("https://grisales-github-io.onrender.com/send-email/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(jsonData),
                    });

                    if (response.ok) {
                        console.log("Email sent successfully!");
                    } else {
                        console.error("Failed to send email. Backend might be down.");
                    }
                } catch (error) {
                    console.error("Error sending request:", error);
                }
            }, 50000); // 50 seconds delay
        });
    }
});
