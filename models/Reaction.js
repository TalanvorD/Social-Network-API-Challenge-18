const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema( // Schema for reactions, not an actual model
    {
        reactionId: { // Creates the reactionId using mongoose
            type: Schema.Types.ObjectId,
            default: function () { return new Types.ObjectId(); }
        },
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
);

module.exports = reactionSchema;