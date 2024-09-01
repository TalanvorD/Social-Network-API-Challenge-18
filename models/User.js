const { Schema, Types, model } = require('mongoose');


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
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email address is not valid. Please enter a valid email address.'], // Validates the email address field against a regex
        },
        thoughts: [{ // Array containing users thoughts
            type: Schema.Types.ObjectId,
            ref: 'thought', // References the Thought model
        }],
        friends: [{ // Array containing users friends
            type: Schema.Types.ObjectId,
            ref: 'user', // References itself
        }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () { // friendCount virtual, not stored in the DB
        if (this.friends) { return this.friends.length; } // Retrieves the length of the friends array and returns the value
});

const User = model('user', userSchema);

module.exports = User;