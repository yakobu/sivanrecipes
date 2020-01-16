const webpush = require("web-push");
const mongoose = require("mongoose");

const Subscription = require('./Subscription');

const RecipeSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        body: String,
        image: String,
        tags: [{type: String}],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    },
    {timestamps: true}
);

RecipeSchema.methods.toJSON = function () {
    return {
        title: this.title,
        description: this.description,
        body: this.body,
        image: this.image,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author.toProfileJSON(),
        tags: this.tags,
        id: this._id

    };
};

RecipeSchema.post("save", function () {
    const split_image = this.image.split(".");
    const image_type = split_image.pop();
    const small_image = `${split_image.join(".")}t.${image_type}`;

    const data = {
        title: this.title,
        body: this.description,
        image: this.image,
        data: this.body,
        url: `${process.env.REACT_APP_BACKEND_URL}recipe/${this._id}`,
        tag: "new-recipe",
        badge: small_image,
        icon: small_image,
    };


    Subscription.find({}, (err, subscriptions) => {
        if (err) {
            console.error(`Error occurred while getting subscriptions`);
            return res.status(500).json({
                error: 'Technical error occurred'
            });
        }
        subscriptions.forEach(subscription =>{
            webpush.sendNotification(subscription.toJSON(), JSON.stringify(data));
        })
    });
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;