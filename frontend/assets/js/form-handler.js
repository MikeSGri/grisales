document.getElementById("quoteForm").addEventListener("submit", async function(event) {
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
        const response = await fetch("https://yourdomain.com/get-quote", {
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
