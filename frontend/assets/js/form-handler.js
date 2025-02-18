document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded Successfully"); // Debugging check

    // Ensure the "GET A QUOTE" button exists
    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("quoteFormContainer");

    if (showFormButton && formContainer) {
        showFormButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevents page jump on click
            
            console.log("Button clicked!"); // Debugging check
            
            // Toggle form visibility
            if (formContainer.style.display === "none" || formContainer.style.display === "") {
                formContainer.style.display = "block";
            } else {
                formContainer.style.display = "none";
            }
        });
    } else {
        console.error("showForm or quoteFormContainer not found!");
    }

    // Ensure the form exists before adding event listener
    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            function sanitize(input) {
                return input.replace(/[<>\/]/g, ""); // Remove HTML tags
            }

            const data = {
                name: sanitize(document.getElementById("name").value),
                email: sanitize(document.getElementById("email").value),
                phone: sanitize(document.getElementById("phone").value),
                message: sanitize(document.getElementById("message").value)
            };

            try {
                const response = await fetch("https://speedytransportation.pro/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error("Server error");

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert("Failed to send quote request. Try again later.");
            }
        });
    } else {
        console.error("quoteForm not found!");
    }
});
