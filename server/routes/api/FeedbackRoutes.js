const router = require('express').Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Feedback = mongoose.model('Feedback');
const FeedbackController = require('../../controllers/FeedbackController');

const feedbackCtrl = new FeedbackController(Feedback);

router.get('/', asyncHandler(feedbackCtrl.getFeedback));
router.post('/', asyncHandler(feedbackCtrl.createFeedback));
router.delete('/', asyncHandler(feedbackCtrl.deleteFeedback));

module.exports = router;