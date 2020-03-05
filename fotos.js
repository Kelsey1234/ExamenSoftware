var express = require('express');
var router = express.Router();
var userModel = require('./fotos.model');

router.get('/users/all', (req,res)=>{

    return res.status(200).json(userModel.getAll());

});

router.get('/users/:id',(req,res)=>{

    var id = parseInt(req.params.id);
    var user = userModel.getById(id);
    return res.status(200).json(user);

});
router.post('/users/new', (req,res)=>{
    var datosEnviados = req.body;
    var newUser = userModel.addNew(datosEnviados);
    return res.status(200).json(newUser);
});


module.exports = router;