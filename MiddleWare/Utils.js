const express = require('express');
const postDB = require('../posts/postDb');
const userDB = require('../users/userDb');

const logger = (req,res,next)=>{
    console.log(`the request:${req.method} made to:${req.originalUrl}`)
    next();
}

const validateUserId = (req,res,next)=>{
    userDB.getById(req.params.id)
    .then((post)=>{
        if(post === undefined){
            res.status(404).json({message:'id not found'})
        }else{
            next();
        }
    })
    .catch(err=>{
        res.status(500).json({err})
    })
  }
    
const validateUser = (req,res,next)=>{
    if(JSON.stringify(req.body)=== '{}'){
        res.status(400).json({message:'missing user data'})
    }else{
        if(!req.body.name){
            res.status(400).json({message:"missing required name field"})
        }else{
            next();
        }
    }
}

const validatePost=(req,res,next) =>{
    if(!req.body){
        res.status(400).json({message:'missing post data'})
    }else{
        if(!req.body.text){
            res.status(400).json({message:"missing required text field"})
        }else{
            next();
        }
    }
}

function validatePostId(req, res, next) {
    postDB.getById(req.params.id)
    .then((post)=>{
        if(post === undefined){
            res.status(404).json({message:'id not found'})
        }else{
            next();
        }
    })
    .catch(err=>{
        res.status(500).json({err})
    })
  }

module.exports={
    logger,
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
};
