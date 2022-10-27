module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        caption: DataTypes.STRING,
        poster_image_url: {
            type: DataTypes.TEXT,
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
        tableName: 'photos',
        timestamps: true
    });

    Photo.associate = function (models) {
        Photo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Photo.hasMany(models.Comment, { foreignKey: 'photo_id', as: 'comments',  onDelete: 'cascade', hooks: true })
    };

    return Photo;
}