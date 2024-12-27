const mongoose = require('mongoose');
let Schema = mongoose.Schema

let author = new Schema({
    firstname: {
        type: String,
        required: [true, "A user must have a first name"],
    },
    lastname: {
        type: String,
        required: [true, "A user must have a last name"],
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        // unique: [true, "A user email must be unique"]
    },
    password: {
        type: String,
        required: true,
    },
    // 1st : Accept a single file 
    profile: {
        type: String,
        required: true,
    },
    // OR //

    // 2nd : Accept an array of files
    // profile: [{
    //     type: String,
    //     required: true,
    // }],
    // OR //

    // 3rd : Accept a mix of files    
    // profile: [{
    //     type: String,
    //     required: false,
    // }],
    // video: [{
    //     type: String,
    //     required: false,
    // }]
});

let AUTHOR = mongoose.model("autho", author)
module.exports = AUTHOR