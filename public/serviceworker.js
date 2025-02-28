self.addEventListener("fetch", async (event) => {
    const url = event.request.url;
  
    // Detect Taskade chat requests
    if (url.includes("taskade.com/api/messages")) {
      event.waitUntil(
        fetch("/api/chat-usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ count: 1 }),
        }).catch((error) => console.error("Error logging chat usage:", error))
      );
    }
  });
  