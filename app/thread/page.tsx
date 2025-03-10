"use client";

import { ThreadComposer } from "./thread-composer";
import { Header } from "./header";
import { SavedThreads } from "./saved-threads";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TurnstileWrapper } from "./turnstile-wrapper";

export default function ThreadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }

    // Inject a script to intercept fetch/XHR requests
    const script = document.createElement("script");
    script.innerHTML = `
      (function() {
        const originalFetch = window.fetch;
        window.fetch = async function(...args) {
          const response = await originalFetch(...args);
          if (args[0].includes("taskade.com/api/messages")) {
            fetch("/api/chat-usage", { 
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ count: 1 })
            });
          }
          return response;
        };

        const originalXHR = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
          if (url.includes("taskade.com/api/messages")) {
            fetch("/api/chat-usage", { 
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ count: 1 })
            });
          }
          return originalXHR.apply(this, arguments);
        };
      })();
    `;
    document.head.appendChild(script);
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted dark:bg-background">
      
      <div className="w-full max-w-4xl mx-auto mb-6 p-4">
        <TurnstileWrapper>
          <iframe
            id="taskade-chat"
            src="https://www.taskade.com/a/01JN5HMQW32K268B8909VY4DK0"
            width="100%"
            height="400"
            frameBorder="0"
            className="rounded-lg shadow-lg bg-white border border-gray-200 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            allow="clipboard-read; clipboard-write"
            allowFullScreen
          />
        </TurnstileWrapper>
      </div>
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <ThreadComposer />
          
          <SavedThreads />
        </div>
      </main>
    </div>
  );
}
