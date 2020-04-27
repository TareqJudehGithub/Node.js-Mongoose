//imports:
const Product = require("../models/product");

//actions: 

//admin products 
exports.getAdminProducts = (req, res, next) => {
     // get all products for the current user:
   
     Product.find()
//.select() and .populate() are like Projections in MongoDB.
     // .select("title price imageUrl -description")
     // .populate("userId", "name")
     .then(products => {
          console.log(products.map(product => {
               return `Displaying: ${product.title}`;
          }));
          res.render(
             "admin/products.ejs",
             {
               prods: products, 
               pageTitle: "Admin Products",
               path: "/admin/products",
               isAuthenticated: req.isLoggedIn
                
             });
     })
     .catch(err => console.log(err));
  };

//Add product by Admin
//Add Product page
exports.getAddProduct = (req, res, next) => {
     res.render(
          "admin/edit-product.ejs",
          {
               pageTitle: "Add new product",
               path: "/admin/add-product",
               editing: false,
               isAuthenticated: req.isLoggedIn
          });              
};

//Add Product action
exports.postAddProduct = (req, res, next) => { 
     const { title, price, imageUrl, description } = req.body;

     //creating a new product by Mongoose:
     const product = new Product({
//props defined in /models.products.js rodcustSchema: data received from
//controller action req.body:
          title: title,
          price: price,
          imageUrl: imageUrl,
          description: description,
//since we saved the user in our req(req.user), we now have access to the user:
//But Mongoose gives us access to the entire User object, so no need
//to include ._id at the end of req.user
          userId: req.user,
          name: req.user.name,
     });
     product
     .save()
     .then(result => {
          console.log(title + " was successfully created and added to products list.")
          res.redirect("/admin/products");
     })
     .catch(err => console.log(err));
};

//Edit Product page
  exports.getEditProduct = (req, res, next) => {
    
     //fetching the product using name id set in the 
     //admin.js routes for getEditProduct:
     const id = req.params.id;
     //find the right product ID, for the current user:
    Product.findById(id) 
     .then(product => {  
          res.render(
               "admin/edit-product.ejs",
               {
                    pageTitle: "Edit product",
                    path: "/admin/edit-product",
                    editing: true,
                    product: product
               });
     })
     .catch(err => console.log(err)); 
  };

//construct a new produt by editing (replacing) the original product:
  exports.postEditProduct = (req, res, next) => {
     const { id, title, price, imageUrl, description } = req.body;

    //1. find the right product ID:
     Product.findByIdAndUpdate(id)
    
     .then(product => {
          product.title = title,
          product.price = price,
          product.imageUrl = imageUrl,
          product.description = description
          return product.save();   
     })    
    .then(result => {
         console.log(title + " was successfully updated!");
         res.redirect("/admin/products");
         })
    .catch(err => console.log(err));
  };

exports.postDeleteProduct = (req, res, next) => {
     const id = req.body.id; 

     Product.findByIdAndRemove(id)
    .then(result => {
         res.redirect("/admin/products");
         console.log(`${result.title} was successfully removed from Products List.`);
    })
    .catch(err => console.log(err));
};
