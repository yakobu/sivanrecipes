const router = require('express').Router();
const passport = require('passport');

const User = require('../../models/User');
const auth = require('../auth');

// Get user data from jwt
router.get("/", auth.required, (req, res, next) => {
    User.findById(req.payload.id).then((user) => {
        if (!user) return res.sendStatus(401);
        return res.json({user: user.toAuthJSON()})
    }).catch(next);
});

// Get all existing users
router.get("/all", auth.required, (req, res, next) => {
    Promise.all([
        User.find({}),
        User.count({}).exec()
    ]).then(results => {
        let users = results[0];
        let userCount = results[1];
        return res.json(
            {
                users: users.map(user => user.toProfileJSON()),
                userCount
            }
        )
    }).catch(next);
});


// Create new user
router.post("/register", (req, res, next) => {
    const user = new User();

    user.name = req.body.user.name;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    user.save().then(() => {
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

// Update user
router.put('/', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then((user) => {
        if (!user) return res.sendStatus(401);

        // only update fields that were actually passed...
        if (typeof req.body.user.name !== 'undefined')
            user.name = req.body.user.name;

        if (typeof req.body.user.email !== 'undefined')
            user.email = req.body.user.email;

        if (typeof req.body.user.bio !== 'undefined')
            user.bio = req.body.user.bio;

        if (typeof req.body.user.image !== 'undefined')
            user.image = req.body.user.image;

        if (typeof req.body.user.password !== 'undefined')
            user.setPassword(req.body.user.password);


        return user.save().then(() => {
            return res.json({user: user.toAuthJSON()});
        });
    }).catch(next);
});

// Auth as a user
router.post('/login', (req, res, next) => {
    if (!req.body.user.email)
        return res.status(422).json({errors: {email: "can't be blank"}});

    if (!req.body.user.password)
        return res.status(422).json({errors: {password: "can't be blank"}});

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(422).join(info);

        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()})

    })(req, res, next);
});

module.exports = router;
