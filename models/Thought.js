const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js'); // Importing the reactionSchema


// Schema to create the Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: { // The content for the thought
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            get: (dateCreated) => { // Creates and formats a timestamp for the thought
                const timeStamp = new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long',
                }).format(dateCreated);
                return timeStamp;
            }
        },
        username: { // References the creator of the thought
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Array of the reactions using the reactionSchema
    },
    {
        toJson: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.virtual('reactionCount').get(function () { // reactionCount virtual, not stored in the DB
        if (!userSchema.reactionss) {
        return;
    } else {
        return this.reactions.length; // Retrieves the length of the reactions array and returns the value
    }
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;