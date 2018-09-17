const router = require('express').Router();
const Recipe = require('../../models/Recipe');

// return a list of all tags
router.get('/', (req, res, next) => {
    return Recipe.find().distinct('tags').then(tags => res.json({
        tags: Array.from(new Set(tags))
    })).catch(next);
});

module.exports = router;