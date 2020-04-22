//imports:
const Product = require("../models/product");

//actions: 

//admin products 
exports.getAdminProducts = (req, res, next) => {
     // get all products for the current user:
   
     Product.find()
     .then(products => {
        res.render(
             "admin/products.ejs",
             {
                pageTitle: "Admin Products",
                path: "/admin/products",
                prods: products
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
          description: description
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
    //find the right product ID:

         const product = new Product(
          title, 
          price, 
          imageUrl, 
          description,
          id,
         );
     product.
     save()   
    .then(result => {
         res.redirect("/admin/products");
         })
    .catch(err => console.log(err));
  };

exports.postDeleteProduct = (req, res, next) => {
     const id = req.body.id; 

     // return req.user.addToCart(product)
     // .then(result => {
     //      console.log(result);
     // })
      
     Product.deleteById(id)
    .then(result => {
         res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
