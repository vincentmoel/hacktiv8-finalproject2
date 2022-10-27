const { SocialMedia } = require('../../../models');
const { User } = require('../../../models');

module.exports = async (req, res) => {

    const socialMedias = await SocialMedia.findAll({ include:
        [
            { model: User, as: 'user' } 
        ] 
    
    });

    return res.json({
        socialMedias
        
    });


}