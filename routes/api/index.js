const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));
router.use('/profile', require('./profile'));
router.use('/tags', require('./tags'));

module.exports = router;