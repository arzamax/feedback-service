const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    feedbackType: {
        type: Schema.Types.ObjectId,
        ref: 'FeedbackType',
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

mongoose.model('Feedback', FeedbackSchema);