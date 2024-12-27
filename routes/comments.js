var express = require('express');
let Com = require("../controllers/comments");
let Auth = require("../controllers/author");

var router = express.Router();

router.post('/create', Auth.secure, Com.ComCreate);

router.get('/showAll', Auth.secure, Com.ComFind);

router.patch('/:id', Auth.secure, Com.ComUpdate);

router.delete('/:id', Auth.secure, Com.ComDelete);

module.exports = router;