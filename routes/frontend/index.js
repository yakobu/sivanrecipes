const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const Recipe = require('../../models/Recipe');

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get('*', function (req, res) {
    const index = path.resolve(__dirname, '../../', 'client', 'build', 'index.html');

    // read in the index.html file
    fs.readFile(index, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        regex = /\/recipe\/(.*)/g;
        match = regex.exec(req.originalUrl);

        if (match != null) {
            recipeId = match[1];

            Recipe.findById(recipeId)
                .populate('author')
                .then((recipe) => {
                    if (!recipe) {
                        return console.log(err);
                    }

                    // replace the special strings with server generated strings
                    data = data.replace(/\$OG_TITLE/g, recipe.title);
                    data = data.replace(/\$OG_DESCRIPTION/g, recipe.description);
                    result = data.replace(/\$OG_IMAGE/g, recipe.image);
                    res.send(result);
                }).catch((error) => {
                data = data.replace(/\$OG_TITLE/g, 'Sivan Recipes');
                data = data.replace(/\$OG_DESCRIPTION/g, "אתר המתכונים המשפחתי של סיון");
                result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/hAtPBki.jpg');
                res.send(result);
            });
        }

        else {
            // replace the special strings with server generated strings
            data = data.replace(/\$OG_TITLE/g, 'Sivan Recipes');
            data = data.replace(/\$OG_DESCRIPTION/g, "אתר המתכונים המשפחתי של סיון");
            result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/hAtPBki.jpg');
            res.send(result);
        }
    });
});


module.exports = router;
