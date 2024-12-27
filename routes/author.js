var express = require('express');
let Auth = require("../controllers/author");
var router = express.Router();

// 1st : Accept a single file 
router.post('/create', Auth.upload.single('profile'), Auth.AuthCreate);
// OR //

// 2nd : Accept an array of files
// router.post('/create', upload.array('profile', 10), Auth.AuthCreate);
// OR //

// 3rd : Accept a mix of files
// let uploadfield = upload.fields([{ name: "profile", maxCount: 10 }, { name: "video", maxCount: 10 }])
// router.post('/create', uploadfield, Auth.AuthCreate);

router.get('/showAll', Auth.secure, Auth.AuthFind);

router.post('/authlogin', Auth.Authlogin);

router.patch('/:id', Auth.secure, Auth.AuthUpdate);

router.delete('/:id', Auth.secure, Auth.AuthDelete);

module.exports = router;


