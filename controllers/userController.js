// const { ObjectId } = require('mongoose').Types; // Mongoose ObjectID // Not actually needed?
const { User, Thought, Reaction } = require('../models'); // Importing models

module.exports = {
    async getUsers(req, res) { // Returns all users and their associated friends
        try {
            const users = await User.find({}).select('-__v');
            if (users) { res.status(200).json(users); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async getSingleUser(req, res) { // Returns a single user and their associated friends
        try {
            const singleUser = await User.findOne({ _id: req.params.userId} ).select('-__v')
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v -thoughts -friends' });
            const singleUserFriend = await User.findOne({ _id: req.params.friendId });
            if (singleUser || singleUserFriend) { return res.status(200).json(singleUser || singleUserFriend); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async createUser(req, res) { // Creates a new user from a POST json body
        try {
            const newUser = new User({
                email: req.body.email,
                username: req.body.username
            });
            await newUser.save();
            const userThought = await User.findOneAndUpdate({ username: req.body.username },
                { $addToSet: { thoughts: newUser._id } });
            if (newUser && userThought) { return res.status(200).json(newUser); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async updateUser(req, res) { // Updates a user from a PUT json body
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId },
                {
                    email: req.body.email,
                    username: req.body.username
                },
                { new: true });
            if (updatedUser) { return res.status(200).json(updatedUser); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async deleteUser(req, res) { // Deletes a single user and associated thoughts
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId }, { rawResult: true });
            const deletedUserName = deletedUser.value.username;
            const deletedUserThoughts = await Thought.deleteMany({username: deletedUserName}, { rawResult: true }); // Bonus for deleting associated thoughts along with the user.
            if (deletedUser && deletedUserThoughts) { return res.status(200).json({ message: `${deletedUserName} and their associated thoughts have been deleted.` }); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate({ _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId} },
            { new: true });
            if (newFriend) { return res.status(200).json(newFriend); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const deletedFriend = await User.findOneAndUpdate({ _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true });
            if (deletedFriend) { return res.status(200).json(deletedFriend); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};