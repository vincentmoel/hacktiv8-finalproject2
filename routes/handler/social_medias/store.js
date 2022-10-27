const { SocialMedia } = require('../../../models');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const v = new Validator();


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
            status: "error",
            message: validate
        });
    }

    const user = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    
    const socialMedia = {
        name: req.body.name,
        social_media_url: req.body.social_media_url,
        userId: user
    }

    const createdSocialMedia = await SocialMedia.create(socialMedia);

    return res.json({
        social_media: createdSocialMedia
        
    });


}