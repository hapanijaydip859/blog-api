var express = require('express');
let Cate = require("../controllers/category");
var router = express.Router();

router.post('/create', Cate.CateCreate);

router.get('/showAll', Cate.CateFind);

router.patch('/:id', Cate.CateUpdate);

router.delete('/:id', Cate.CateDelete);

module.exports = router;