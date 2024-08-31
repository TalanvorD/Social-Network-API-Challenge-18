const { Schema, model } = require('mongoose');


// Schema to create the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email address is not valid. Please enter a valid email address.'], // Validates the email address field
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought', // References the Thought model
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user', // References itself
        }],
    },
    {
        toJson: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () { // friendCount virtual, not stored in the DB
        if (!userSchema.friends) {
        return;
    } else {
        return this.friends.length; // Retrieves the length of the friends array and returns the value
    }
});

const User = model('user', userSchema);

module.exports = User;