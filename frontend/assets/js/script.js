// const apiUrl = "http://192.168.2.1:8000/send-email/"; // Correct API URL

// document.getElementById("quoteForm").addEventListener("submit", async function(event) {
//     event.preventDefault();

//     const data = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         phone: document.getElementById("phone").value,
//         message: document.getElementById("message").value
//     };

//     try {
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) throw new Error("Server error");

//         const result = await response.json();
//         alert(result.message);
//     } catch (error) {
//         console.error("❌ API Error:", error);
//         alert("Failed to send quote request. Try again later.");
//     }
// });
