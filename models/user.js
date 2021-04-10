
const mongoose = require('mongoose');

const userSchema= ({
  firstname:{type:String, trim:true},
  lastname:{type:String, trim:true},
  age:Number,
  hobbies:[{type:String, trim:true}]
});

module.exports =  User = mongoose.model('User',userSchema)

