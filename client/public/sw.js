function receivePushNotification(event) {
    console.log("[Service Worker] Push Received.");

    const {title, ...payload } = event.data.json();

    const options = {
        ...payload,
        ttl: 36000,
        vibrate: [200, 100, 200],
        data:{
            url: payload.url
        }
    };
    event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);