"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const User = require('../models/user');


module.exports = function(app) {
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
     if(!data || err) return res.json([]);
     else{
       let mapData = data.map(item=>item)
       res.json(mapData)
     }
   })
  })
};