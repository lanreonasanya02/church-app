importScripts("https://js.pusher.com/beams/service-worker.js");

self.addEventListener("push", (event) => {
  if (event.data) {
    const payload = event.data.json();
    const { title, body, icon, url } = payload;

    const options = {
      body: body || "You have a new notification!",
      icon: icon || "/logo.png",
      badge: "/icons/android-chrome-192x192.png",
      vibrate: [200, 100, 200],
      actions: [
        { action: "open_app", title: "Open App" },
        { action: "dismiss", title: "Dismiss" },
      ],
      data: { url: url || "/" },
    };

    event.waitUntil(
      self.registration.showNotification(title || "New Notification", options)
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "open_app") {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
