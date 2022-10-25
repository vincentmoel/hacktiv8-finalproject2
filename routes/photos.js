const express = require('express');
const router = express.Router();

const photoHandler = require('./handler/photos');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, photoHandler.store); 
// router.put('/:id', verifyToken, photoHandler.update); 
// router.delete('/:id', verifyToken, photoHandler.destroy); 

module.exports = router;
