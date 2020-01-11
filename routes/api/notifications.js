const router = require('express').Router();

const webpush = require("web-push");

webpush.setGCMAPIKey();
webpush.setVapidDetails(
    `mailto:${process.env.APP_EMAIL}`,
    process.env.GOOGLE_API_KEY,
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);


const testData = {
    title: "Testing",
    body: "It's a success!",
    icon: "https://www.herzog.ac.il/wp-content/uploads/2017/11/whatsapp-icon-logo-vector.png"
};

let subscription;
let pushIntervalID;

router.post("/register", (req, res, next) => {
    subscription = req.body;
    console.log(subscription);
    res.sendStatus(201);
    pushIntervalID = setInterval(() => {
        // sendNotification can only take a string as it's second parameter
        webpush.sendNotification(subscription, JSON.stringify(testData))
            .catch(() => clearInterval(pushIntervalID))
    }, 30000);
});

router.delete("/unregister", (req, res, next) => {
    subscription = null;
    clearInterval(pushIntervalID);
    res.sendStatus(200)
});


module.exports = router;
