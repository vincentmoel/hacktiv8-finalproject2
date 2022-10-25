const { Photo } = require('../../../models');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const v = new Validator();


const {
    JWT_SECRET
} = process.env;


module.exports = async (req, res) => {
    const schema = {
        title: 'string|empty:false',
        caption: 'string|empty:false',
        poster_image_url: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    const userz = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    
    const photo = {
        title: req.body.title,
        caption: req.body.caption,
        poster_image_url: req.body.poster_image_url,
        userId: userz
    }

    const createdPhoto = await Photo.create(photo);

    return res.json({
        id:createdPhoto.id,
        poster_image_url:createdPhoto.poster_image_url,
        title:createdPhoto.title,
        caption:createdPhoto.caption,
        userId:createdPhoto.userId,
        
    });


}