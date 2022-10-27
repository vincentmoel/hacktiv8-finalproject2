const { Photo } = require('../../../models');


const jwt = require('jsonwebtoken');


const {
    JWT_SECRET
} = process.env;


module.exports = async (req, res) => {

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


    Photo.destroy({
        where: {
            id
        }
    }).then(function (rowDeleted) { 
        if (rowDeleted === 1) {
            return res.json({
                message: "Success Destroy Photo"
            });
        }
    }, function (err) {
        return res.json({
            message: err
        });
    });

}