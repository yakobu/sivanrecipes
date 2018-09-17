const auth = require("../auth");
const router = require('express').Router();

const User = require('../../models/User');
const Recipe = require('../../models/Recipe');
const Comment = require('../../models/Comment');

const upload = require('../../config/upload');

// Preload recipe objects on routes with ':recipe'
router.param('recipe', (req, res, next, recipeId) => {
    Recipe.findById(recipeId)
        .populate('author')
        .then((recipe) => {
            if (!recipe) {
                return res.sendStatus(404);
            }

            req.recipe = recipe;

            return next();
        }).catch(next);
});

// Preload comment objects on routes with ':comment'
router.param('comment', function (req, res, next, id) {
    Comment.findById(id).then(comment => {
        if (!comment) {
            return res.sendStatus(404);
        }

        req.comment = comment;

        return next();
    }).catch(next);
});

// return recipes
router.get('/', auth.required, (req, res, next) => {
    let limit = 20;
    let offset = 0;
    let query = {};

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = (req.query.offset - 1) * limit;
    }

    if (typeof req.query.required_tags !== 'undefined') {
        query.tags = {$all: req.query.required_tags};
    }

    if (typeof req.query.id !== 'undefined') {
        query._id = req.query.id
    }

    if (typeof req.query.author_ids !== 'undefined') {
        query.author = req.query.author_ids
    }

    Promise.all([
        Recipe.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createdAt: "desc"})
            .populate('author')
            .exec(),
        Recipe.count(query).exec()
    ]).then(results => {
        let recipes = results[0];
        let recipesCount = results[1];
        return res.json(
            {
                recipes: recipes.map(recipe => recipe.toJSON()),
                recipesCount
            }
        )
    }).catch(next);
});


// Create recipe
router.post('/', auth.required, upload.single('recipeImage'), function (req, res, next) {
    const recipeData = {
        ...req.body,
        tags: JSON.parse(req.body.tags),
        image: req.file ? req.file.data.link : "https://i.imgur.com/bKzIQBP.jpg"
    };

    User.findById(req.payload.id).then((user) => {
        if (!user) return res.sendStatus(401);
        const recipe = new Recipe(recipeData);

        recipe.author = user;

        return recipe.save()
            .then(() => {
                return res.json(
                    {
                        recipe: recipe.toJSON()
                    }
                );
            });
    }).catch(next);
});


router.put('/:recipe', auth.required, upload.single('recipeImage'), (req, res, next) => {
    const recipeData = {
        ...req.body,
        tags: JSON.parse(req.body.tags),
        image: req.file ? req.file.data.link : req.body.recipeImage
    };

    if (req.recipe.author._id.toString() === req.payload.id.toString()) {
        Recipe.findByIdAndUpdate(req.recipe.id, recipeData)
            .then(recipe => {
                Recipe.findById(recipe._id)
                    .populate('author')
                    .then((recipe) => {
                        if (!recipe) {
                            return res.sendStatus(404);
                        }
                        return res.json({recipe: recipe.toJSON()});
                    }).catch(next);
            }).catch(next)
    } else {
        return res.sendStatus(403);
    }
});


// return an recipe's comments
router.get('/:recipe/comments', auth.required, (req, res) => {
    req.recipe.populate({
        path: 'comments',
        populate: {
            path: 'author'
        },
        options: {
            sort: {
                createdAt: 1
            }
        }
    }).execPopulate().then(recipe => (
        res.json(
            {
                comments: recipe.comments.map((comment) => {
                    return comment.toJSON();
                })
            }
        )
    ))

});

// create a new comment
router.post('/:recipe/comments', auth.required, upload.single('commentImage'), (req, res, next) => {
    User.findById(req.payload.id).then((user) => {
        if (!user) {
            return res.sendStatus(401);
        }

        commentData = {
            ...req.body,
            image: req.file ? req.file.data.link : "",
        };

        const comment = new Comment(commentData);
        comment.recipe = req.recipe;
        comment.author = user;

        return comment.save().then(() => {
            req.recipe.comments.push(comment);

            return req.recipe.save().then(() => {
                res.json({comment: comment.toJSON()});
            });
        });
    }).catch(next);
});

router.delete('/:recipe/comments/:comment', auth.required, (req, res) => {
    if (req.comment.author.toString() === req.payload.id.toString()) {
        req.recipe.comments.remove(req.comment._id);
        req.recipe.save()
            .then(Comment.findById(req.comment._id).remove().exec())
            .then(() => {
                res.sendStatus(204);
            });
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;