const router = require('express').Router();

const webpush = require("web-push");

webpush.setGCMAPIKey("AIzaSyD6XYoeL6saW9IAH1MkiEyPnquqo_3neD0");
webpush.setVapidDetails(
    "mailto:ronenya4321@gmail.com",
    "BGFHkDMtwtZX9CILiJUypW7-G-LBPbAsu1OkB4YyOqsF58VGUg3t_P1VARwPfMmy7j8zpVh6qc1u7IU9me8DM28",
    "LZLZdU_ZoMj3z8c6Fi9WUOWO20t-dnJdGONqlLRj5Lw"
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
