const User = require("../models/user");
exports.getLogin = (req, res, next) => {
     console.log(req.session.isLoggedIn);
     res.render(
          "auth/login.ejs",
          {
               pageTitle: "Login Page",
               path: "/login",
               isAuthenticated: false     
          });
};
exports.postLogin = (req, res, next) => {
     
     User.findById("5ea0cf52deced82c2c0920a3")
     .then(user => {
          req.session.isLoggedIn = true;
     //mongoose stores the user in this req below:
          req.session.user = user;
          res.redirect("/");     
     })
     .catch(err => console.log(err));   
};

exports.getSignUp = (req, res, next) => {
     res.render(
          "auth/signUp.ejs",
          {
               pageTitle: "Sign Up",
               path:"/signUp",
               isAuthenticated: req.session.isLoggedIn
          }
     )
};