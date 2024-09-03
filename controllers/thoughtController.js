const { ObjectId } = require('mongoose').Types; // Mongoose ObjectID
const { User, Thought, Reaction } = require('../models'); // Importing models

module.exports = {
    async getThoughts(req, res) { // Returns all thoughts
        try {
            const thoughts = await Thought.find({}).select('-__v');
            if (thoughts) { res.status(200).json(thoughts); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async getSingleThought(req, res) { // Returns a single thought
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!singleThought) { return res.status(404).json({ message: 'Thought not found!' }) }
                else { return res.status(200).json(singleThought); };
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
                { $addToSet: { thoughts: newThought._id } });
            if (!newThought) { return res.status(404).json({ message: 'Error creating new thought!' }); }
                else { return res.status(200).json({ message: 'New thought has been created!', newThought }); };
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
            if (!updatedThought) { return res.status(404).json({ message: 'Thought not found to update!' }); }
                else { return res.status(200).json({ message: 'Thought has been updated.', updatedThought }); };
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async deleteThought(req, res) { // Deletes a single thought
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }, { rawResult: true });
            if (!deletedThought) { return res.status(200).json({ message: 'Thought not found to delete!' }); }
                else { return res.status(200).json({ message: 'Thought has been deleted.', deletedThought }); };
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
            },
            { new: true }).select('-__v');
            if (!newReaction) { return res.status(200).json({ message: 'There was a problem adding a reaction!' }); }
                else { return res.status(200).json({ message: 'Reaction has been created.',  newReaction }); };
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) { // Deletes a reaction
        try {
            const deletedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }).select('-__v');
            if (!deletedReaction) { return res.status(200).json({ message: 'There was a problem deleting a reaction!' }); }
                else { return res.status(200).json({ message: 'Reaction has been deleted.', deletedReaction }); };
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};