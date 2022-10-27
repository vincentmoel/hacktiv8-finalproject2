const { Comment } = require('../../../models');


const jwt = require('jsonwebtoken');


const {
    JWT_SECRET
} = process.env;


module.exports = async (req, res) => {

    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    const userId = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    if (!comment) {
        return res.status(404).json({
            status: 'error',
            message: 'Comment not found'
        });
    }


    if(comment.user_id != userId)
    {
        return res.status(404).json({
            status: 'error',
            message: 'Not Authorized'
        });
    }


    Comment.destroy({
        where: {
            id
        }
    }).then(function (rowDeleted) { 
        if (rowDeleted === 1) {
            return res.json({
                message: "Success Destroy Comment"
            });
        }
    }, function (err) {
        return res.json({
            message: err
        });
    });

}