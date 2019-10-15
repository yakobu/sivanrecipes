const mongoose = require("mongoose");
const router = require('express').Router();

const User = require('../../models/User');
const auth = require('../auth');

// Change User Password
router.post("/change_password", auth.required, (req, res, next) => {
    User.findById(req.payload.id).then((user) => {
        if (!user || !user.is_admin) return res.sendStatus(401);
        const { users, newPassword } = req.body
        User.find({
            '_id': {
                $in:
                    users.map(userId => mongoose.Types.ObjectId(userId))
            }
        }, function (err, userList) {
            if (err) return res.sendStatus(400);
            userList.forEach(userObj => {
                userObj.setPassword(newPassword);
                userObj.save()
            });
            return res.sendStatus(201);
        })
    }).catch(next);
});

module.exports = router;
