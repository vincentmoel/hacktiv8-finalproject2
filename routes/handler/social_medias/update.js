const { SocialMedia } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require('jsonwebtoken');


const {
    JWT_SECRET
} = process.env;


module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        social_media_url: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const id = req.params.id;
    const getSocialMedia = await SocialMedia.findByPk(id);
    const userId = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    if (!getSocialMedia) {
        return res.status(404).json({
            status: 'error',
            message: 'Social Media not found'
        });
    }


    if(getSocialMedia.user_id != userId)
    {
        return res.status(404).json({
            status: 'error',
            message: 'Not Authorized'
        });
    }


    
    const {
        name,social_media_url
    } = req.body;

    await getSocialMedia.update({
        name,social_media_url
    });

    return res.json({
        social_media:{
            name,social_media_url
        }
    })

}