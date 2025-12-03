// src/components/NotificationRetry.jsx
import React, { useEffect, useState } from "react";
import {
  subscribeUser,
  requestNotificationPermission,
  registerServiceWorker,
} from "../push";

// KEY names used in localStorage
const LS_KEY_DENY_AT = "notif_deny_at";
const LS_KEY_REMIND_COUNT = "notif_remind_count";

// how long to wait before showing reminder again (in days)
const RETRY_DAYS = 1;

function daysSince(timestamp) {
  if (!timestamp) return Infinity;
  return (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
}

export default function NotificationRetry({ autoSubscribeAfterGrant = true }) {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );
  const [shouldShowReminder, setShouldShowReminder] = useState(false);
  const [remindCount, setRemindCount] = useState(
    parseInt(localStorage.getItem(LS_KEY_REMIND_COUNT) || "0", 10)
  );

  useEffect(() => {
    // register SW early (safe)
    if ("serviceWorker" in navigator) {
      registerServiceWorker().catch(() => {});
    }
    setPermission(Notification?.permission || "denied");

    // decide whether to show reminder
    const denyAt =
      parseInt(localStorage.getItem(LS_KEY_DENY_AT) || "0", 10) || 0;
    const since = daysSince(denyAt);
    if (permission === "denied") {
      // show reminder only if enough days passed and remindCount not excessive
      if (since >= RETRY_DAYS && remindCount < 5) {
        setShouldShowReminder(true);
      }
    } else if (permission === "default") {
      // optional: you might show a soft CTA for first-time users (not automatic)
      // keep shouldShowReminder false here and show CTA from other UI
      setShouldShowReminder(false);
    } else {
      setShouldShowReminder(false);
    }
  }, [permission, remindCount]);

  // When user clicks the in-app CTA to try again
  const handleTryAgain = async () => {
    // This call should happen in a user gesture (button click), which is allowed
    try {
      const result = await requestNotificationPermission(); // returns 'granted'|'denied'|'default'
      setPermission(result);

      if (result === "granted") {
        // clear any deny timestamp
        localStorage.removeItem(LS_KEY_DENY_AT);

        // optionally subscribe for server push
        if (autoSubscribeAfterGrant) {
          try {
            await subscribeUser();
          } catch (err) {
            // subscription could fail (VAPID mismatch, SW not ready, etc.)
            console.error("subscribeUser failed", err);
          }
        }
        setShouldShowReminder(false);
      } else {
        // user denied again — record timestamp and increment reminder counter
        const now = Date.now();
        localStorage.setItem(LS_KEY_DENY_AT, String(now));
        const newCount = remindCount + 1;
        localStorage.setItem(LS_KEY_REMIND_COUNT, String(newCount));
        setRemindCount(newCount);
        setShouldShowReminder(false);
      }
    } catch (err) {
      console.error("requestPermission failed", err);
    }
  };

  if (!("Notification" in window)) return null; // not supported

  // If nothing to show, return null (no UI)
  if (!shouldShowReminder) return null;

  // Render a gentle in-app reminder (not a browser prompt)
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 320,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        zIndex: 9999,
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <strong>Enable notifications?</strong>
          <p style={{ margin: "6px 0", fontSize: 13 }}>
            We’ll send helpful reminders and important updates. You can always
            turn them off later.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleTryAgain} style={{ padding: "8px 12px" }}>
              Try again
            </button>
            <button
              onClick={() => {
                // dismiss this reminder now — record timestamp so we don't nag again immediately
                localStorage.setItem(LS_KEY_DENY_AT, String(Date.now()));
                setShouldShowReminder(false);
              }}
              style={{ padding: "8px 12px", background: "#f3f3f3" }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
