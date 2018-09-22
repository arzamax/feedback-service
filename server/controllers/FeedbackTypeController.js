class FeedbackTypeController {

    constructor(model) {
        this.model = model;
        this.createFeedbackType = this.createFeedbackType.bind(this);
        this.deleteFeedbackType = this.deleteFeedbackType.bind(this);
        this.getFeedbackTypes = this.getFeedbackTypes.bind(this);
        this.updateFeedbackType = this.updateFeedbackType.bind(this);
    }

    set model(value) {
        this._model = value;
    }

    async getFeedbackTypes(req, res) {
        const feedbackTypes = await this._model.find();

        res.json(feedbackTypes);
    }

    async createFeedbackType(req, res) {
        const feedbackType = new this._model(req.body);
        const isFeedbackTypeExists = await this._model.findOne({ label: req.body.label });

        if (!isFeedbackTypeExists) {
            const newFeedbackType = await feedbackType.save();

            res.json(newFeedbackType);

        } else {
            res.json({ error: true, message: `Feedback type already exists` });
        }
    }

    async updateFeedbackType(req, res) {
        const updatedFeedbackType = await this._model.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { label: req.body.label } },
            { new: true }
        );

        res.json(updatedFeedbackType);
    }

    async deleteFeedbackType(req, res) {
        const removedFeedbackType = await this._model.findOneAndDelete({ _id: req.body.id });

        if (removedFeedbackType) {
            res.json(removedFeedbackType);

        } else {
            res.json({ error: true, message: `There is no such feedback type` })
        }
    }
}

module.exports = FeedbackTypeController;