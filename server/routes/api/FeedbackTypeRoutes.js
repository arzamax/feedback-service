const router = require('express').Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const FeedbackType = mongoose.model('FeedbackType');
const FeedbackTypeController = require('../../controllers/FeedbackTypeController');

const feedbackTypeCtrl = new FeedbackTypeController(FeedbackType);

router.get('/', asyncHandler(feedbackTypeCtrl.getFeedbackTypes));
router.post('/', asyncHandler(feedbackTypeCtrl.createFeedbackType));
router.delete('/', asyncHandler(feedbackTypeCtrl.deleteFeedbackType));
router.put('/', asyncHandler(feedbackTypeCtrl.updateFeedbackType));

module.exports = router;