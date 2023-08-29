module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
      content: DataTypes.STRING
    });
  
    Conversation.associate = models => {
      Conversation.belongsTo(models.Chatbot, { foreignKey: 'chatbotId' });
      Conversation.belongsTo(models.EndUser, { foreignKey: 'endUserId' });
    };
  
    return Conversation;
  };