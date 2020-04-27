//core modules
const path = require("path");

//imports
const User = require("./models/user");

//mongoose:
const mongoose = require("mongoose");
const MongoDB_URI = "mongodb+srv://TJDBuser:D6INl1sR8aBSzvtn@nodemongodb-bm3zf.mongodb.net/Nodejs-Mongoose?retryWrites=true&w=majority";
//express-session
const session = require("express-session");

//connect-mongodb-session - store
//1.
const MongoDBStore = require("connect-mongodb-session")(session);
//2. initialize a new store: executing MongoDBStore as a constructor:
const store = new MongoDBStore({
     //connectoin string:
     uri: MongoDB_URI,
     collection: "sessions"
});

//Express Server setup
const express = require("express");
const app = express();

//EJS 1. setup:
app.set("view engine", "ejs");
app.set("views", "views"); //for the views folder

//Routes:
const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/404");

//middlwares:
//express-bodyParser
app.use(express.urlencoded( {extended: false }));
//static files path: to grant access to other folders:
app.use(express.static(path.join(__dirname, "/public")));
//express-session
app.use(
     session({ 
          secret: "password", 
          resave: false, 
          saveUninitialized: false,
          store: store
     })
);  

//end-points:
app.use(adminRoute);
app.use(shopRoutes);
app.use(authRoutes);

//Error page not found for undefined routes.
app.use(errorController.get404);

//mongoose connection setup:
mongoose
     .connect(
     MongoDB_URI,
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

 
     






