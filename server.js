const mongoose = require('mongoose');
const mongoDB = require('mongodb');
const express = require('express');
const cors = require('cors');

const apiRoutes = require("./api/routes.js");

const app = express();
app.use(cors({origin: '*'}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const db = mongoose.connection;

//Index page (static HTML)
app.route("/").get(function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//Routing for API
apiRoutes(app);

const johnnyBravo = new User({
  firstname:'Johnny',
  lastname:'Bravo',
  age:50,
  hobbies:['Wearing sunglasses','Crying']
});

const timmyA = new User({
  firstname:'lorky',
  lastname:'timmy',
  age:12,
  hobbies:['Swimming','Paddling']
});

// 1. Insert & Save


// User.find({},(err,data)=>{
//     if (err || !data) return console.log(err)
//     else{
//       if( data !== johnnyBravo || data !== timmyA)
//       johnnyBravo.save();
//       timmyA.save();
//     }
// })



// 2. Find & Search
// User.find({},(err,data)=>{
//   if (err || !data) return console.log(err)
//   else{
//     console.log(`User found: ${data}` )
//   }
// })

// User.find({lastname:'timmy'},(err,data)=>{
//   if (err || !data) return console.log(err)
//   else{
//     console.log(`User found: ${data}` )
//   }
// })

// 3. Delete & Remove 

// User.find({},(err,data)=>{
//     if (err || !data) return console.log(err)
// }).remove()


app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + process.env.PORT);
});