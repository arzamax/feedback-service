const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackType = mongoose.model('FeedbackType');

const FeedbackSchema = new Schema({
    feedbackType_id: {
        type: Schema.Types.ObjectId,
        ref: 'FeedbackType',
        required: true
    },
    text: {
        type: String,
        required: true
    }
},{ timestamps: true });

FeedbackSchema.methods.toJSONForClient = async function(id) {
    const { label: feedbackType } = await FeedbackType.findOne({ _id: id });

    return {
        id: this._id,
        feedbackType,
        text: this.text,
        createdAt: this.createdAt
    }
};

module.exports = mongoose.model('Feedback', FeedbackSchema);