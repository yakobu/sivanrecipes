const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/*', require('./frontend'));

module.exports = router;