const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, "can't be blank"]
    },
    image: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
}, {timestamps: true});

CommentSchema.methods.toJSON = function () {
    return {
        id: this._id,
        body: this.body,
        image: this.image,
        createdAt: this.createdAt,
        author: this.author.toProfileJSON()
    };
};

CommentSchema.methods.emailNotifier = function () {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: process.env.APP_EMAIL_SERVICE,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_EMAIL_PASSWORD
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            to: this.recipe.author.email, // list of receivers
            subject: this.author.name + " הגיב לך על מתכון: " + this.recipe.title,
            text: this.body + "\n" + this.image,
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions);
    });

};

CommentSchema.post("save", function () {
    if(this.recipe.author.email !== this.author.email)
        this.emailNotifier()
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;