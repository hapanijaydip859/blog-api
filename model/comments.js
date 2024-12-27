const mongoose = require('mongoose');
let Schema = mongoose.Schema

let comments = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default : Date.now,
    },
});

let COMMENT = mongoose.model("comment", comments)
module.exports = COMMENT