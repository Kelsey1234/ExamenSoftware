var express = require('express');
var router = express.Router();

var fotosRouter = require('./fotos/fotos');

router.use('/fotos',fotosRouter);

module.exports = router;