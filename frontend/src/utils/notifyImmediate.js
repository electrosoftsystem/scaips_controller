// utils/notifyImmediate.js
export async function requestPermissionAndShowDemo() {
  if (!("Notification" in window))
    throw new Error("Notifications not supported");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return { granted: false, permission };

  // Option A: show notification from page (works right away but limited)
  new Notification("Thanks! Notifications enabled", {
    body: "We can show notifications while this tab is open.",
  });

  // Option B: if service worker is registered, show via service worker (better click handling)
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.ready;
    reg.showNotification("Thanks! Notifications enabled", {
      body: "We can show notifications while this tab is open.",
      data: { demo: true },
    });
  }

  return { granted: true, permission };
}
