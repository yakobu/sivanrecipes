const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const expiresIn = 60 * 60 * 24 * 7; //Seconds

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "can't be blank"],
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            unique: true,
            index: true
        },
        bio: String,
        image: String,
        hash: String,
        salt: String
    },
    {
        timestamps: true
    });

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
        }, secret, {expiresIn: expiresIn});
};

UserSchema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        expirationTime: expiresIn
    };
};

UserSchema.methods.toProfileJSON = function () {
    return {
        id: this._id,
        name: this.name,
        bio: this.bio,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: this.email
    };
};


const User = mongoose.model('User', UserSchema);

module.exports = User;