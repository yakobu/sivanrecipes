const router = require('express').Router();

const auth = require('../auth');
const Subscription = require('../../models/Subscription');

router.post("/register", auth.required, (req, res, next) => {
    const subscriptionData = {...req.body, user: req.payload.id};

    const subscriber = new Subscription(subscriptionData);

    return subscriber.save()
        .then(() => {
            return res.json(
                {
                    subscriber: subscriber.toJSON()
                }
            );
        }).catch(err => {
            if (err.message.includes("duplicate key error index")){
                console.log("User already subscribed");
                return res.json({subscriber: subscriber.toJSON()});
            }

            console.error(err.message);
            next(err)
        });
});


module.exports = router;
