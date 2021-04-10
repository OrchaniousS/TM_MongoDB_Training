"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const User = require('../models/user');

module.exports = function(app) {
  app
  .route('/api/users')
  .get(function(req,res){
    User.find({}).exec((err,data)=>{
      if(err) return res.json({error:"No users available"})
      else{
        res.json(data.map(item=>item))
      }
    })
  })


  app
  .route('/api/user/:username')
  .get(function(req, res){
   let userName = req.params.username;

   const {
     firstName,
     lastName,
     userAge,
     userHobbies
   } = req.query;

   User.aggregate([
     {$match:{firstname:userName}}
   ]).exec((err,data)=>{
     if(err) return res.json({error:'No such user found'});
     else{
       let mapData = data.map(item=>item)
       res.json(mapData)
     }
   })
  })


  .post(function(req, res) {
   let userName = req.params.username;
   
   const {
     firstName,
     lastName,
     userAge,
     userHobbies
     } = req.body;

    //   to add required fields

    const newUser = new User({
      firstname:firstName || "",
      lastname:lastName || "",
      age:userAge || "",
      hobbies: userHobbies.split(' ') || [""],
    })

    User.findOne({firstname:userName},(err,dataUser)=>{
      if(!dataUser){
        newUser.save((err,data)=>{
          if(err || !data) return console.log('error saving user')
          else{
            res.json(newUser)
          }
        })
      } else{
        dataUser.save((err,data)=>{
          if(err || !data) return console.log('error saving user')
          else{
            res.json(newUser)
          }
        })
      }
    })
  })

  
};