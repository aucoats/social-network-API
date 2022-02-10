const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: 'Reaction body required', 
        maxlength: 280
    },
    username: {
        type: String, 
        required: 'Username required'
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: 'Thought content required', 
        minlength: 1, 
        maxlength: 280
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (createdAtVal) => dateFormat(createdAtVal) 
    },
    username: {
        type: String, 
        required: 'Username required'
    },
    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 

