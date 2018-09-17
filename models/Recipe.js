const mongoose = require("mongoose");

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

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;