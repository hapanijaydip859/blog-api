var express = require('express');
let Auth = require("../controllers/author");
let Post = require("../controllers/post");
var router = express.Router();

let uploadfield = Auth.upload.fields([{ name: "images", maxCount: 5 }, { name: "video", maxCount: 2 }])

router.post('/create', uploadfield, Auth.secure, Post.PostCreate);

router.get('/showAll', Auth.secure, Post.PostFind);

router.patch('/:id', Auth.secure, Post.PostUpdate);

router.delete('/:id', Auth.secure, Post.PostDelete);

module.exports = router;