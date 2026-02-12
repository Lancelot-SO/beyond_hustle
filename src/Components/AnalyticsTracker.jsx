import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * AnalyticsTracker component
 * Tracks page views by sending data to the analytics API on every location change.
 */
export default function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        // Retrieve or generate a session ID
        const sessionId =
            localStorage.getItem("session_id") ||
            (() => {
                const id = crypto.randomUUID();
                localStorage.setItem("session_id", id);
                return id;
            })();

        // Track the page view event
        fetch("https://api.drboahemaantim.com/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                event_type: "page_view",
                url: window.location.href,
                referrer: document.referrer,
                session_id: sessionId,
            }),
        }).catch(err => console.error("Analytics tracking failed:", err));
    }, [location]);

    return null;
}
