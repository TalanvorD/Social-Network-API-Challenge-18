const { ObjectId } = require('mongoose').Types; // Mongoose ObjectID
const { User, Thought, Reaction } = require('../models'); // Importing models

module.exports = {
    async getThoughts(req, res) { // Returns all thoughts
        try {
            const thoughts = await Thought.find({});
            if (thoughts) { res.status(200).json(thoughts); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async getSingleThought(req, res) { // Returns a single thought
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
            if (singleThought) { return res.status(200).json(singleThought); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async createThought(req, res) { // Creates a new thought from a POST json body and associates it with a user
        try {
            const newThought = new Thought({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            });
            await newThought.save();
            const userThought = await User.findOneAndUpdate({ username: req.body.username },
                {
                    $addToSet: { thoughts: newThought._id }
                });
            if (newThought && userThought) { return res.status(200).json(newThought); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async updateThought(req, res) { // Updates a thought from a PUT json body
        try {
            const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                {
                    thoughtText: req.body.thoughtText,
                    username: req.body.username
                },
                {
                    runValidators: true,
                    new: true
                });
            if (updatedThought) { return res.status(200).json(updatedThought); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async deleteThought(req, res) { // Deletes a single thought
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }, { rawResult: true });
            if (deletedThought) { return res.status(200).json(deletedThought); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) { // Creates a new reaction from a POST json body and associates it with a thought
        try {
            const newReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $addToSet: {
                    reactions: {
                        reactionBody: req.body.reactionBody,
                        username: req.body.username
                    }
                }
            });
            if (newReaction) { return res.status(200).json(newReaction); }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) { // Deletes a reaction
        try {
            const deletedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true });
            if (deletedReaction) { return res.status(200).json(deletedReaction); }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};