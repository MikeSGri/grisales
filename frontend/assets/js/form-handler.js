async function retryRequests() {
    let requestQueue = JSON.parse(localStorage.getItem("pendingRequests")) || [];

    if (requestQueue.length > 0) {
        console.log(`Retrying ${requestQueue.length} stored requests...`);

        for (let i = 0; i < requestQueue.length; i++) {
            let request = requestQueue[i];

            // Stop retrying after 3 attempts
            if (request.retryCount >= 3) {
                console.error("Max retries reached for:", request);
                requestQueue.splice(i, 1); // Remove it from the queue
                i--; // Adjust index after removal
                continue;
            }

            try {
                const response = await fetch("https://grisales-github-io.onrender.com/send-email/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request),
                });

                if (response.ok) {
                    console.log("Stored request sent successfully!");
                    requestQueue.splice(i, 1); // Remove successful request
                    i--; // Adjust index after removal
                } else {
                    request.retryCount += 1; // Increment retry counter
                }
            } catch (error) {
                console.error("Backend still down, keeping requests stored.");
                request.retryCount += 1; // Increment retry counter
            }
        }

        localStorage.setItem("pendingRequests", JSON.stringify(requestQueue));
    }
}

// Retry every 30 seconds
setInterval(retryRequests, 30000);
