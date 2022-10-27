const { Photo } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require('jsonwebtoken');


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
            status: 'error',
            message: validate
        });
    }

    const id = req.params.id;
    const photo = await Photo.findByPk(id);
    const userId = jwt.decode(req.headers.authorization, JWT_SECRET).data.id;

    if (!photo) {
        return res.status(404).json({
            status: 'error',
            message: 'Photo not found'
        });
    }


    if(photo.user_id != userId)
    {
        return res.status(404).json({
            status: 'error',
            message: 'Not Authorized'
        });
    }


    
    const {
        title,caption,poster_image_url
    } = req.body;

    await photo.update({
        title,caption,poster_image_url
    });

    return res.json({
        photo:{
            title,caption,poster_image_url
        }
    })

}