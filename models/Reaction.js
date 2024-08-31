const { Schema } = require('mongoose');

// Schema for reactions, not an actual model
const reactionSchema = new Schema(
    {
        reactionId: { // Create a reactionId using mongoose.ObjectId
            type: String,
            default: mongoose.Types.ObjectId,
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
    {
        toJson: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;