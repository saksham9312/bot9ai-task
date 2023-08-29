const {User} = require('../models');
const {Chatbot} = require('../models');
const uuid = require('uuid');

module.exports.create = async function(req,res){
    try{
        let isUserValid = await User.findOne({where: {id: req.params.userId}});
        
        if(isUserValid){
            //Check if Chatbot already exists
            let isChatbot = await Chatbot.findOne({where: {name: req.body.name, userId: req.params.userId}});
            console.log(isChatbot)
            if(isChatbot){
                return res.status(409).json({message: "Chatbot Already Exists!"});
            }else{
                let newChatbot = await Chatbot.create({
                    name: req.body.name,
                    userId: req.params.userId
                });
                return res.status(201).json({message: `Chatbot Created Successfully for User: ${isUserValid.username}`, chatbotCredentials: newChatbot});
            }
        }else{
            return res.status(409).json({message: "User Does Not Exists!"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error in creating Chatbot!", error: err});
    }
}

module.exports.fetchbyUserId = async function(req,res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    try{
        let isUserValid = await User.findOne({where: {id: req.params.userId}});
        
        if(isUserValid){
            let chatbots = await Chatbot.findAndCountAll({where: {userId: req.params.userId}, offset,limit});
            const totalPages = Math.ceil(chatbots.count / limit);
            return res.status(200).json({
                chatbots: chatbots.rows,
                currentPage: page,
                totalPages
            });
        }else{
            return res.status(409).json({message: "User Does Not Exists!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Fetching Chatbots!", error: err});
    }
}

module.exports.fetchbyId = async function(req,res){
    try{
        let requestedId = req.params.chatbotId;
        let chatbot = await Chatbot.findOne({where: {id: requestedId}});
        if(chatbot){
            return res.status(200).json(chatbot);
        }else{
            return res.status(409).json({message: "Chatbot Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Fetching Chatbot!", error: err});
    }
}

module.exports.deletebyId = async function(req,res){
    try{
        let requestedId = req.params.chatbotId;
        let chatbot = await Chatbot.findOne({where: {id: requestedId}});
        if(chatbot){
            await Chatbot.destroy({where: {id: requestedId}});
            return res.status(200).json({message: `Chatbot successfully deleted with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "Chatbot Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Deleting Chatbot!", error: err});
    }
}

module.exports.updatebyId = async function(req,res){
    try{
        let requestedId = req.params.chatbotId;
        let chatbot = await Chatbot.findOne({where: {id: requestedId}});
        if(chatbot){
            chatbot.name = req.body.name;
            chatbot.userId = req.body.userId;
            await chatbot.save()
            return res.status(200).json({message: `Chatbot successfully updated with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "Chatbot Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Updating Chatbot!", error: err});
    }
}
