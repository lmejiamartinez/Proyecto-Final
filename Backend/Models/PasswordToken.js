
module.exports = (sequelize, DataTypes) => {
    const PasswordResetToken = sequelize.define('PasswordResetToken', {
        token: DataTypes.STRING,
        expiresAt: DataTypes.DATE,
    });

    PasswordResetToken.associate = (models) => {
        PasswordResetToken.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            onDelete: 'CASCADE',
        });
    };

    return PasswordResetToken;
};
