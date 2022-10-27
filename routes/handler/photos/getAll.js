const { Comment } = require('../../../models');
const { User } = require('../../../models');
const { Photo } = require('../../../models');

module.exports = async (req, res) => {

    const photos = await Photo.findAll({ include:
        [
            { model: Comment, as: 'comments' },
            { model: User, as: 'user' } 
        ] 
    
    });

    return res.json({
        photos
        
    });


}