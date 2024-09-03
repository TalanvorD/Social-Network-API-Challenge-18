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
            if (!singleUser) { return res.status(404).json({ message: 'User not found!' }) }
                else { return res.status(200).json(singleUser || singleUserFriend) };
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
            if (!newUser) { return res.status(500).json({ message: 'Error creating new user!' }); }
                else { return res.status(200).json(newUser); }
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
                { new: true }).select('-__v');
            if (!updatedUser) { return res.status(404).json({ message: 'User not found to update!' }); }
                else { return res.status(200).json({ message: `${updatedUser.username} has been updated.`, updatedUser }); };
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async deleteUser(req, res) { // Deletes a single user and associated thoughts
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId }, { rawResult: true }).select('-__v');
            const deletedUserThoughts = await Thought.deleteMany( {username: deletedUser.username}, { rawResult: true }); // Bonus for deleting associated thoughts along with the user.
            if (!deletedUser) { return res.status(404).json({ message: 'User not found to delete!' }); }
                else { return res.status(200).json({ message: `${deletedUser.username} and their associated thoughts have been deleted.`, deletedUser }); };
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate({ _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId} },
            { new: true }).select('-__v');
            if (!newFriend) { return res.status(404).json({ message: 'There was a problem adding a friend!' }); }
                else { return res.status(200).json({ message: 'Friend has been added.', newFriend }); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const deletedFriend = await User.findOneAndUpdate({ _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }).select('-__v');
            if (!deletedFriend) { return res.status(404).json({ message: 'There was a problem deleting a friend!' }); }
                else { return res.status(200).json({ message: 'Friend has been deleted.', deletedFriend }); }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};