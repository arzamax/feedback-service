const router = require('express').Router();

router.use('/feedbacktype', require('./FeedbackTypeRoutes'));
router.use('/feedback', require('./FeedbackRoutes'));

module.exports = router;