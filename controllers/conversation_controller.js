const {User} = require('../models');
const {Chatbot} = require('../models');
const {Conversation} = require('../models');
const uuid = require('uuid');

module.exports.create = async function(req,res){
    try{
        let isChatbotValid = await Chatbot.findOne({where: {id: req.params.chatbotId}});
        
        if(isChatbotValid){
            let newConversation = await Conversation.create({
                content: req.body.content,
                chatbotId: req.params.chatbotId,
                endUserId: req.body.endUserId
            });
            return res.status(201).json({message: `Conversation Created Successfully for Chatbot: ${isChatbotValid.name}`, conversationCredentials: newConversation});
        }else{
            return res.status(409).json({message: "Chatbot Does Not Exists!"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error in starting a Conversation!", error: err});
    }
}

module.exports.fetchbyChatbotId = async function(req,res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    try{
        let isChatbotValid = await Chatbot.findOne({where: {id: req.params.chatbotId}});
        
        if(isChatbotValid){
            let conversations = await Conversation.findAndCountAll({where: {chatbotId: req.params.chatbotId}, offset, limit});
            const totalPages = Math.ceil(conversations.count / limit);
            return res.status(200).json({
                conversations: conversations.rows,
                currentPage: page,
                totalPages
            });
        }else{
            return res.status(409).json({message: "Chatbot Does Not Exists!"});
        }
    }catch(err){
        res.status(500).json({message: `Error in Fetching Conversations for Chatbot ID: ${req.params.chatbotId}`, error: err});
    }
}

module.exports.fetchbyId = async function(req,res){
    try{
        let requestedId = req.params.conversationId;
        let conversation = await Conversation.findOne({where: {id: requestedId}});
        if(conversation){
            return res.status(200).json(conversation);
        }else{
            return res.status(409).json({message: "Conversation Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Fetching Conversation!", error: err});
    }
}

module.exports.deletebyId = async function(req,res){
    try{
        let requestedId = req.params.conversationId;
        let conversation = await Conversation.findOne({where: {id: requestedId}});
        if(conversation){
            await Conversation.destroy({where: {id: requestedId}});
            return res.status(200).json({message: `Conversation successfully deleted with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "Conversation Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Deleting Conversation!", error: err});
    }
}

module.exports.updatebyId = async function(req,res){
    try{
        let requestedId = req.params.conversationId;
        let conversation = await Conversation.findOne({where: {id: requestedId}});
        if(conversation){
            conversation.content= req.body.content,
            conversation.chatbotId= req.body.chatbotId
            await conversation.save()
            return res.status(200).json({message: `Conversation successfully updated with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "Conversation Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Updating Conversation!", error: err});
    }
}
