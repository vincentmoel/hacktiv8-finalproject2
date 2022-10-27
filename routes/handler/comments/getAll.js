const { Comment } = require('../../../models');
const { User } = require('../../../models');
const { Photo } = require('../../../models');

module.exports = async (req, res) => {

    const comments = await Comment.findAll({ include:
        [
            { model: Photo, as: 'photo' },
            { model: User, as: 'user' } 
        ] 
    
    });

    return res.json({
        comments
        
    });


}