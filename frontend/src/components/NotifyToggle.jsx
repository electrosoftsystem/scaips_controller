// src/components/NotifyToggle.jsx
import React, { useEffect, useState } from "react";
import {
  registerServiceWorker,
  requestNotificationPermission,
  subscribeUser,
  unsubscribeUser,
} from "../push";

export default function NotifyToggle() {
  const [permission, setPermission] = useState(Notification.permission);
  const [subscribed, setSubscribed] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    // ensure SW registered (safe if already registered)
    registerServiceWorker().catch(() => {});
    (async () => {
      if (!("serviceWorker" in navigator)) return;
      const reg = await navigator.serviceWorker.ready;
      const s = await reg.pushManager.getSubscription();
      setSubscribed(!!s);
      setPermission(Notification.permission);
    })();
  }, []);

  // Full push subscription so server can send later
  const handleSubscribe = async () => {
    try {
      const p = await requestNotificationPermission();
      setPermission(p);
      if (p !== "granted") {
        setStatusMsg("Please allow notifications to subscribe.");
        return;
      }
      await subscribeUser(); // sends subscription to backend
      setSubscribed(true);
      setStatusMsg("Subscribed for server push notifications.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Subscription failed: " + (err.message || err));
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeUser();
      setSubscribed(false);
      setStatusMsg("Unsubscribed from push notifications.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Unsubscribe failed.");
    }
  };

  return (
    <div>
      <p>
        Notification permission: <strong>{permission}</strong>
      </p>
      <p>
        Push subscription: <strong>{subscribed ? "yes" : "no"}</strong>
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {subscribed ? (
          <button onClick={handleUnsubscribe}>
            Unsubscribe (stop server pushes)
          </button>
        ) : (
          <button onClick={handleSubscribe}>Subscribe for Server Push</button>
        )}
      </div>

      {statusMsg && <p style={{ marginTop: 8 }}>{statusMsg}</p>}
      <small style={{ display: "block", marginTop: 8, color: "#666" }}>
        Tip: Permission = allow browser to show notifications. Subscribing
        creates a server endpoint so we can push even when the site is closed.
      </small>
    </div>
  );
}
