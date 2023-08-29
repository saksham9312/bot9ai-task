const {User} = require('../models')
// const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports.create = async function(req,res){
    try{
        let isUser = await User.findOne({where: {email: req.body.email}});
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(isUser);
        if(!isUser){
            let newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
            const token = jwt.sign({ id: newUser.id }, secretKey);
            return res.status(201).json({message: "User Created Successfully!", user: newUser, token: token});
        }else if (isUser && (await bcrypt.compare(req.body.password, isUser.password)) ){
            const token = jwt.sign({ id: isUser.id }, secretKey);
            return res.status(409).json({message: "User Already Exist! Logging In!", token: token});
        }else{
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error in creating user!", error: err});
    }
}

module.exports.fetchall = async function(req,res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    try{

        let users = await User.findAndCountAll({
            offset,
            limit
        });
        const totalPages = Math.ceil(users.count / limit);
        if(users){
            return res.status(200).json({
                users: users.rows,
                currentPage: page,
                totalPages
            });
        }else{
            return res.status(409).json({message: "No User Exits!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Fetching Users!", error: err});
    }
}

module.exports.fetchbyId = async function(req,res){
    try{
        let requestedId = req.params.id;
        let user = await User.findOne({where: {id: requestedId}});
        if(user){
            return res.status(200).json(user);
        }else{
            return res.status(409).json({message: "User Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Fetching User!", error: err});
    }
}

module.exports.deletebyId = async function(req,res){
    try{
        let requestedId = req.params.id;
        let user = await User.findOne({where: {id: requestedId}});
        if(user){
            await User.destroy({where: {id: requestedId}});
            return res.status(200).json({message: `User successfully deleted with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "User Does not exist!"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error in Deleting User!", error: err});
    }
}

module.exports.updatebyId = async function(req,res){
    try{
        let requestedId = req.params.id;
        let user = await User.findOne({where: {id: requestedId}});
        if(user){
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            await user.save()
            return res.status(200).json({message: `User successfully updated with ID: ${requestedId}`});
        }else{
            return res.status(409).json({message: "User Does not exist!"});
        }
    }catch(err){
        res.status(500).json({message: "Error in Updating User!", error: err});
    }
}
