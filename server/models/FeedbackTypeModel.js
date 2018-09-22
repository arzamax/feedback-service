const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackTypeSchema = Schema({
    label: {
        type: String,
        required: true
    }
});

mongoose.model('FeedbackType', FeedbackTypeSchema);