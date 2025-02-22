document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded Successfully"); // Debugging check

    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("quoteFormContainer");

    if (showFormButton && formContainer) {
        showFormButton.addEventListener("click", function(event) {
            event.preventDefault();
            console.log("Button clicked!");

            formContainer.style.display = (formContainer.style.display === "none" || formContainer.style.display === "") 
                ? "block" 
                : "none";
        });
    } else {
        console.error("showForm or quoteFormContainer not found!");
    }

    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            function sanitize(input) {
                return input.replace(/[<>\/]/g, ""); // Remove HTML tags
            }

            const formData = new FormData();
            formData.append("name", sanitize(document.getElementById("name").value));
            formData.append("email", sanitize(document.getElementById("email").value));
            formData.append("phone", sanitize(document.getElementById("phone").value));
            formData.append("message", sanitize(document.getElementById("message").value));

            try {
                const response = await fetch("http://192.168.2.1:8000/send-email/", {
                    method: "POST",
                    body: formData,
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
