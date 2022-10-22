const { User } = require('../../../models');





module.exports = async (req, res) => {

    User.destroy({
        where: {
            id: req.params.id 
        }
    }).then(function (rowDeleted) { 
        if (rowDeleted === 1) {
            return res.json({
                message: "Success Destroy User"
            });
        }
    }, function (err) {
        return res.json({
            message: err
        });
    });

}