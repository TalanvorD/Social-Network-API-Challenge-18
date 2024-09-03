const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema( // Schema for reactions, not an actual model
    {
        reactionBody: { // The content for the reaction
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            get: (dateCreated) => { // Creates and formats a timestamp for the reaction
                const timeStamp = new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long',
                }).format(dateCreated);
                return timeStamp;
            }
        },
        username: { // References the creator of the reaction
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    },
);

module.exports = reactionSchema;