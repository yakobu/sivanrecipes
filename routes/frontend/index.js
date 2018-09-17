const router = require('express').Router();
const path = require('path');

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get('*', function (req, res) {
    const index = path.join('client', 'build', 'index.html');
    res.sendFile(index, { root: path.join(__dirname, '../../')  });
});

module.exports = router;
