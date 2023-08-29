const {EndUser} = require('../models')
// const sequelize = require('../config/sequelize');

module.exports.create = async function(req,res){
    try{
        let isEndUser = await EndUser.findOne({where: {email: req.body.email}});
        if(!isEndUser){
            let newEndUser = await EndUser.create({
                name: req.body.name,
                email: req.body.email,
            });
            return res.status(201).json({message: "EndUser Created Successfully!", enduser: newEndUser});
        }else{
            return res.status(409).json({message: "EndUser Already Exists!"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error in creating EndUser!", error: err});
    }
}

module.exports.fetchall = async function(req,res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    try{
        let endusers = await EndUser.findAndCountAll({offset,limit});
        const totalPages = Math.ceil(endusers.count / limit);
        if(endusers){
            return res.status(200).json({
                endusers: endusers.rows,
                currentPage: page,
                totalPages
            });
        }else{
            return res.status(409).json({message: "No EndUser Exits!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Fetching EndUsers!", error: err});
    }
}

module.exports.fetchbyId = async function(req,res){
    try{
        let requestedId = req.params.endUserId;
        let enduser = await EndUser.findOne({where: {id: requestedId}});
        if(enduser){
            return res.status(200).json(enduser);
        }else{
            return res.status(409).json({message: "EndUser Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: `Error in Fetching EndUser with ID: ${req.params.endUserId}`, error: err});
    }
}

module.exports.deletebyId = async function(req,res){
    try{
        let requestedId = req.params.endUserId;
        let enduser = await EndUser.findOne({where: {id: requestedId}});
        if(enduser){
            await EndUser.destroy({where: {id: requestedId}});
            return res.status(200).json({message: `EndUser successfully deleted with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "EndUser Does not exist!"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Error in Deleting EndUser with ID: ${req.params.endUserId}`, error: err});
    }
}

module.exports.updatebyId = async function(req,res){
    try{
        let requestedId = req.params.endUserId;
        let enduser = await EndUser.findOne({where: {id: requestedId}});
        if(enduser){
            enduser.name = req.body.name;
            enduser.email = req.body.email;
            await enduser.save()
            return res.status(200).json({message: `EndUser successfully updated with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "EndUser Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: `Error in Updating User with ID: ${requestedId}`, error: err});
    }
}
