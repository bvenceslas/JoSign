const router = require('express').Router();

// API test
router.route('/test').get((req, res) => {
    res.send('JoSign API works perfectly ......');
});

module.exports = router;