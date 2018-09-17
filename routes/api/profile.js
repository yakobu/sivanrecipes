const router = require('express').Router();

const auth = require('../auth');
const User = require('../../models/User');
const upload = require('../../config/upload');

// Preload user before accessing routes
router.param("username", (req, res, next, username) => {
    User.findOne({username: name}).then((user) => {
        if (!user) return res.sendStatus(404);
        req.profile = user;
        return next()
    }).catch(next)
});

router.get("/:username", (req, res) => {
    return res.json(
        {
            profile: req.profile.toProfileJSON()
        }
    )
});


// Update user profile
router.put('/', auth.required, upload.single('userImage'), (req, res, next) => {
    User.findByIdAndUpdate(req.payload.id, {image: req.file.data.link}).then((user) => {
        if (!user) return res.sendStatus(401);
        res.sendStatus(200);
    }).catch(next);
});

module.exports = router;