const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        full_name: 'string|empty:false',
        email: 'email|empty:false',
        username: 'string|empty:false',
        password: 'string|min:6|empty:false',
        profile_image_url: 'string|empty:false|type:url',
        age: 'number|empty:false',
        phone_number: { type: "number", nullable: true },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    const getUserByEmail = await User.findOne({
        where: { email: req.body.email },
        
    });

    if (getUserByEmail) {
        return res.status(409).json({
            status: 'error',
            message: 'Email already exists'
        });
    }
    
    const getUserByUsername = await User.findOne({
        where: { username: req.body.username },
        
    });

    if (getUserByUsername) {
        return res.status(409).json({
            status: 'error',
            message: 'Username already exists'
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const user = {
        full_name: req.body.full_name,
        email: req.body.email,
        username: req.body.username,
        password,
        profile_image_url: req.body.profile_image_url,
        age: req.body.age,
        phone_number: req.body.phone_number,
    }

    const createdUser = await User.create(user);

    return res.json({
        user: {
            full_name: createdUser.full_name,
            email: createdUser.email,
            username: createdUser.username,
            profile_image_url: createdUser.profile_image_url,
            age: createdUser.age,
            phone_number: createdUser.phone_number,
        }
    });

}