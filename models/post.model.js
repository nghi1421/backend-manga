const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        require: true,
    },
    
    likes: [{type: mongoose.Schema.ObjectId, ref: 'user'}],

    comments: [{
        text: String,
        created_at: {
            type: Date,
            default: Date.now()
        },
        updated_at:{
            type: Date,
        },
        posted_by: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },
    }],
    posted_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
    },
})