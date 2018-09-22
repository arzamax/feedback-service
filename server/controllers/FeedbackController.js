const mongoose = require('mongoose');

const FeedbackType = mongoose.model('FeedbackType');

class FeedbackController {

    constructor(model) {
        this.model = model;
        this.createFeedback = this.createFeedback.bind(this);
        this.deleteFeedback = this.deleteFeedback.bind(this);
        this.getFeedback = this.getFeedback.bind(this);
    }

    set model(value) {
        this._model = value;
    }

    async getFeedback(req, res) {
        const feedback = await this._model.find();
        const feedbackToJSON = await Promise.all(feedback.map(async (feedbackItem) => {
            return await feedbackItem.toJSONForClient(feedbackItem.feedbackType_id);
        }));

        res.json(feedbackToJSON);
    }

    async createFeedback(req, res) {
        const feedback = new this._model(req.body);
        const newFeedback = await feedback.save();

        res.json(newFeedback);
    }

    async deleteFeedback(req, res) {
        const deletedFeedback = await this._model.findOneAndDelete({ _id: req.body.id });

        if (deletedFeedback) {
            res.json(deletedFeedback);

        } else {
            res.json({ error: true, message: `There is no such feedback` });
        }
    }
}

module.exports = FeedbackController;