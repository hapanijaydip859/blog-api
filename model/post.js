const mongoose = require('mongoose');
let Schema = mongoose.Schema

let post = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    video: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autho"
    },
    categoryIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryIds"
    },
    tags: {
        type: [String],
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
    },
    publishDate: {
        type: String,
        required: true,
    }
});

let POST = mongoose.model("posts", post)
module.exports = POST