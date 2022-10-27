const { Comment } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require('jsonwebtoken');


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
            status: 'error',
            message: validate
        });
    }

    const id = req.params.id;
    const getComment = await Comment.findByPk(id);
    const userId = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    if (!getComment) {
        return res.status(404).json({
            status: 'error',
            message: 'Comment not found'
        });
    }


    if(getComment.user_id != userId)
    {
        return res.status(404).json({
            status: 'error',
            message: 'Not Authorized'
        });
    }


    
    const {
        photo_id,comment
    } = req.body;

    await getComment.update({
        photo_id,comment
    });

    return res.json({
        comment:{
            photo_id,comment
        }
    })

}