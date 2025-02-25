document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded Successfully");

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

    try {
        const response = await fetch("https://speedytransportation.pro/send-email/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString(),
        });
    
        let result;
        try {
            result = await response.json(); // Try parsing JSON response
        } catch (jsonError) {
            console.error("Invalid JSON response:", jsonError);
            throw new Error("Server returned an invalid response");
        }
    
        if (response.ok) {
            alert("Success: " + (result.message || "Email sent successfully!"));
        } else {
            alert("Error: " + (result.error || "An error occurred"));
        }
    } catch (error) {
        alert("Failed to send quote request. Try again later.");
        console.error("Fetch error:", error);
    }
    
});
