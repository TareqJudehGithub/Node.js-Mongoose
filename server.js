//core modules
const path = require("path");

//imports

const User = require("./models/user");

//mongoose:
const mongoose = require("mongoose");



//Express Server setup
const express = require("express");
const app = express();

//EJS 1. setup:
app.set("view engine", "ejs");
app.set("views", "views"); //for the views folder

//Routes:
const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/404");

//middlwares:
app.use(express.urlencoded( {extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use((req, res, next) => {
     User.findById("5ea0cf52deced82c2c0920a3")
     .then(user => {
     //mongoose stores the user in this req below:
          req.user = user;
          next();
     })
     .catch(err => console.log(err));
});

//static files path: to grant access to other folders:


//end-points:
app.use(adminRoute);
app.use(shopRoutes);

//Error page not found for undefined routes.
app.use(errorController.get404);

//mongoose connection setup:
mongoose
     .connect(
     "mongodb+srv://TJDBuser:D6INl1sR8aBSzvtn@nodemongodb-bm3zf.mongodb.net/Nodejs-Mongoose?retryWrites=true&w=majority",
     {
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          useFindAndModify: false
     })
     .then(result => {
          //find() with no arguements, returns the 1st document it find:
          User.findOne()
          .then(user => {
               if (!user) {
                    //creating a new usre from models/user.js:
              const user = new User({
                   name: "John",
                   email: "john@email.com",
                   cart: {
                        items: []
                   }
              });
              user.save();
              }
          })        
          app.listen(4000, () => {
          console.log("Express server is up and running on PORT 4000.");
          });
     })
     .catch(err => {
          console.log("Error starting Express server.");
     })
//Mongoose DB connection test:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to Mongoose!")
});

 
     






