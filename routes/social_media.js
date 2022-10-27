const express = require('express');
const router = express.Router();

const socialMediaHandler = require('./handler/social_medias');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, socialMediaHandler.getAll); 
router.post('/', verifyToken, socialMediaHandler.store); 
router.put('/:id', verifyToken, socialMediaHandler.update); 
router.delete('/:id', verifyToken, socialMediaHandler.destroy); 

module.exports = router;
