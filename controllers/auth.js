exports.getLogin = (req, res, next) => {
     //spliting with ; and taking the 2nd value now in the array [1]
     const isloggedIn = req
          .get("Cookie")
          .split(";")[0]
          .trim()
          .split("=")[0];
     res.render(
          "auth/login.ejs",
          {
               pageTitle: "Login Page",
               path: "/login",
               isAuthenticated: isloggedIn     
          });
};
exports.postLogin = (req, res, next) => {
     //setting up a cookie: Set-Cookie is a resereved name for Node.js
   
     res.cookie("loggedIn=true");
     res.redirect("/");
     
};
exports.getSignUp = (req, res, next) => {
     res.render(
          "auth/signUp.ejs",
          {
               pageTitle: "Sign Up",
               path:"/signUp",
               isAuthenticated: req.isLoggedIn
          }
     )
};