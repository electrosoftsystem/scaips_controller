// public/sw.js
self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (err) {
      data = { title: "Notification", body: event.data.text() };

      console.log(err);
    }
  }

  const title = data.title || "New Message";
  const iconUrl = data.icon || self.location.origin + "/logo223.png"; // ← uses your logo.png
  const badgeUrl = data.badge || self.location.origin + "/logo223.png";

  const options = {
    body: data.body || "",
    icon: iconUrl,
    badge: badgeUrl,
    data: {
      url: data.url || "/",
      ...data.data,
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        for (const client of clientsArr) {
          if (client.url === urlToOpen && "focus" in client)
            return client.focus();
        }
        if (self.clients.openWindow) return self.clients.openWindow(urlToOpen);
      })
  );
});
