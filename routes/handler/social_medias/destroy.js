const { SocialMedia } = require('../../../models');


const jwt = require('jsonwebtoken');


const {
    JWT_SECRET
} = process.env;


module.exports = async (req, res) => {

    const id = req.params.id;
    const socialMedia = await SocialMedia.findByPk(id);
    const userId = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    if (!socialMedia) {
        return res.status(404).json({
            status: 'error',
            message: 'Social Media not found'
        });
    }


    if(socialMedia.user_id != userId)
    {
        return res.status(404).json({
            status: 'error',
            message: 'Not Authorized'
        });
    }


    SocialMedia.destroy({
        where: {
            id
        }
    }).then(function (rowDeleted) { 
        if (rowDeleted === 1) {
            return res.json({
                message: "Success Destroy Social Media"
            });
        }
    }, function (err) {
        return res.json({
            message: err
        });
    });

}