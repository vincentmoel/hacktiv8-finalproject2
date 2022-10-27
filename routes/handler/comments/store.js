const { Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const v = new Validator();


const {
    JWT_SECRET
} = process.env;


module.exports = async (req, res) => {
    const schema = {
        photo_id: 'string|empty:false',
        comment: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    const user = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    
    const comment = {
        comment: req.body.comment,
        photo_id: req.body.photo_id,
        userId: user
    }

    const createdComment = await Comment.create(comment);

    return res.json({
        comment: createdComment
        
    });


}