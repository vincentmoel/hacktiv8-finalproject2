const express = require('express');
const router = express.Router();

const commentHandler = require('./handler/comments');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, commentHandler.getAll); 
router.post('/', verifyToken, commentHandler.store); 
router.put('/:id', verifyToken, commentHandler.update); 
router.delete('/:id', verifyToken, commentHandler.destroy); 

module.exports = router;
