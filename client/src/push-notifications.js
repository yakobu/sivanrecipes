import {axiosNotificationsInstance} from "./axios/axios";

const vapidPublicKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}


export function subscribePush() {
    navigator.serviceWorker.ready.then(registration => {
        if (!registration.pushManager) {
            alert("Push Unsupported");
            return
        }

        registration.pushManager.getSubscription().then(subscriptions => {
            registration.pushManager
                .subscribe({
                    userVisibleOnly: true, //Always display notifications
                    applicationServerKey: convertedVapidKey
                })
                .then(subscription => {
                    const token = localStorage.getItem("token");
                    axiosNotificationsInstance.post("/register", subscription, {
                        headers: {
                            Authorization: "Bearer " + token
                        },
                    }).then(response => {
                        console.log(response)
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => console.error("Push subscription error: ", err));
        });
    })
}


function subscribeToPullMessages() {
    const pushNotificationSuported = "serviceWorker" in navigator && "PushManager" in window;

    if (!pushNotificationSuported) {
        throw Error("Push notifications is not supported")
    }

    // Register service worker.
    navigator.serviceWorker.register("/sw.js");
    Notification.requestPermission(result => {
        if (result === 'granted') {
            subscribePush()
        }
    });
}

export default subscribeToPullMessages;
