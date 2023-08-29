module.exports = (sequelize, DataTypes) => {
    const Chatbot = sequelize.define('Chatbot', {
      name: DataTypes.STRING
    });
  
    Chatbot.associate = models => {
      Chatbot.belongsTo(models.User, { foreignKey: 'userId' });
      Chatbot.hasMany(models.Conversation, { foreignKey: 'chatbotId' });
    };
  
    return Chatbot;
  };