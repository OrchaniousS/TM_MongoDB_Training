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
   let username = req.params.username;

   const {
     _id,
     firstname,
     lastname,
     age,
     hobbies
   } = req.query;

   User.aggregate([
     {$match:{firstname:username}},
     {$unwind:"$users"},
     _id != undefined ? 
     {$match:{"_id":ObjectId(_id)}}
     :{$match:{}}
   ]).exec((err,data)=>{
     if(err) return res.json({error:'No such user found'});
     else{
       let mapData = data.map(item=>item)
       res.json(mapData)
     }
   })
  })


  .post(function(req, res) {
   let username = req.params.username;

   const {
     firstname,
     lastname,
     age,
     hobbies
     } = req.body;

    //   to add required fields

    const newUser = new User({
      firstname:firstname || "",
      lastname:lastname || "",
      age:age || "",
      hobbies: hobbies.split(' ') || [""],
    })

    User.findOne({firstname:username},(err,dataUser)=>{
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