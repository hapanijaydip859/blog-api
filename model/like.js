const mongoose = require('mongoose');
let Schema = mongoose.Schema

let likes = new Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autho"
    },
    count: {
        type: Number
    }
});

let LIKE = mongoose.model("like", likes)
module.exports = LIKE