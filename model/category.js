const mongoose = require('mongoose');
let Schema = mongoose.Schema

let categoryIds = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
});

let CATEGORY = mongoose.model("categoryIds", categoryIds)
module.exports = CATEGORY