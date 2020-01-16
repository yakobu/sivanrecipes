const router = require('express').Router();

const auth = require('../auth');
const Subscription = require('../../models/Subscription');

router.post("/register", auth.required, (req, res, next) => {
    const subscriptionData = {...req.body, user: req.payload.id};

    console.log(subscriptionData);
    const subscriber = new Subscription(subscriptionData);

    return subscriber.save()
        .then(() => {
            return res.json(
                {
                    subscriber: subscriber.toJSON()
                }
            );
        });
});


module.exports = router;
