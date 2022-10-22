const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = { 
        full_name: 'string|empty:false',
        email: 'email|empty:false',
        username: 'string|empty:false',
        profile_image_url: 'string|empty:false|type:url',
        age: 'number|empty:false',
        phone_number: { type: "number", nullable: true },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    const userEmail = req.body.email; 
    const userUsername = req.body.username; 
    if (userEmail) {
        const getUserByEmail = await User.findOne({
            where: { email: req.body.email },
            
        });
    
        if (getUserByEmail && userEmail !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already exists'
            });
        }
        
        const getUserByUsername = await User.findOne({
            where: { username: req.body.username },
            
        });
    
        if (getUserByUsername && userUsername !== user.username) {
            return res.status(409).json({
                status: 'error',
                message: 'Username already exists'
            });
        }
    }

    const {
        full_name,email,username,profile_image_url,age,phone_number
    } = req.body;

    await user.update({
        full_name,email,username,profile_image_url,age,phone_number
    });

    return res.json({
        user:{
            id: user.id,
            full_name,
            email,
            username,
            profile_image_url,
            age,
            phone_number
        }
    })

}