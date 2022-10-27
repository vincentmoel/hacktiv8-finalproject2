module.exports = (sequelize, DataTypes) => {
    const SocialMedia = sequelize.define('SocialMedia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        social_media_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'social_medias',
        timestamps: true
    });

    SocialMedia.associate = function (models) {
        SocialMedia.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };

    return SocialMedia;
}