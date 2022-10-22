const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users');
const verifyToken = require('../middlewares/verifyToken');

router.post('/login', userHandler.login); 
router.post('/register', userHandler.register); 
router.put('/:id', verifyToken, userHandler.update); 
router.delete('/:id', verifyToken, userHandler.destroy); 

module.exports = router;
