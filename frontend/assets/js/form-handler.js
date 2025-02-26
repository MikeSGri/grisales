document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully");

    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("quoteFormContainer");
    const quoteForm = document.getElementById("quoteForm");
    let isSubmitting = false; // Prevent multiple submissions within 10 seconds

    // Ensure button and form container exist
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

    // Function to submit the form with retry logic
    async function submitForm(formData, attempt = 1) {
        if (isSubmitting) {
            alert("Please wait before submitting again.");
            return;
        }
        isSubmitting = true; // Block new submissions

        console.log(`Submitting form... Attempt ${attempt}`);

        try {
            const response = await fetch("https://grisales-github-io.onrender.com/send-email/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(formData).toString(),
            });

            let result;
            try {
                result = await response.json(); // Try parsing JSON response
            } catch (jsonError) {
                console.error("Invalid JSON response:", jsonError);
                throw new Error("Server returned an invalid response");
            }

            alert("Thank you for submitting!"); // Always show this message

            if (response.ok) {
                alert("Success: " + (result.message || "Email sent successfully!"));
                quoteForm.reset(); // Clear form after successful submission
                isSubmitting = false; // Allow new submissions
                return;
            } else {
                throw new Error(result.error || "An error occurred");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            if (attempt < 2) {
                console.log(`Retrying in 50 seconds...`);
                setTimeout(() => submitForm(formData, attempt + 1), 50000);
            } else {
                alert("Failed to send quote request after multiple attempts. Try again later.");
                isSubmitting = false; // Allow new submissions
            }
        }

        // Ensure security delay of 10 seconds after final attempt
        setTimeout(() => {
            isSubmitting = false;
        }, 10000);
    }

    // Handle form submission
    if (quoteForm) {
        quoteForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            if (isSubmitting) {
                alert("Please wait before submitting again.");
                return;
            }
            const formData = new FormData(quoteForm);
            submitForm(formData);
        });
    } else {
        console.error("quoteForm not found!");
    }
});
