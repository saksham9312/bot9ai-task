module.exports = (sequelize, DataTypes) => {
    const EndUser = sequelize.define('EndUser', {
      name: DataTypes.STRING,
      email: DataTypes.STRING
    });
  
    EndUser.associate = models => {
      EndUser.hasMany(models.Conversation, { foreignKey: 'endUserId' });
    };
  
    return EndUser;
  };