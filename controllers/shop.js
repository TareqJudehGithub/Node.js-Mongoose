//imports:
const Product = require("../models/product");

//users routes:
exports.getProducts = (req, res, next) => {
     Product.fetchAll()
          .then(products => {
               res.render(
                    "shop/product-list.ejs",
                    {
                         prods: products,
                         pageTitle: "Products List",
                         path: "/products"
                    });
               })
          .catch(err => console.log("Products List Error!", err));
};
//Product details:
 exports.getProductById = (req, res, next) => {
  //* The value we use after params is the value we used
     //in /routes/shop.js   (/products/:id)
     const id = req.params.id;

     Product.findById(id)
          .then((product) => {
               res.render(
                    "shop/product-detail.ejs",
                    {
                         product: product,
                         pageTitle: "Product Details",
                         path: "/products"
                    }
               );
          })
          .catch(err => console.log(err));
};
//Shop (main page)
 exports.getIndex = (req, res, next) => {
     Product.fetchAll()
     .then(products => {
          res.render(
               "shop/index.ejs",
               {
                    prods: products,
                    pageTitle: "Shop",
                    path: "/"
               })
          })
     .catch(err => {console.log(err)});
 };
 
 //Cart
 exports.getCart = (req, res, next) => {

     //fetching cart from db:
     req.user
     .getCart()
     .then(products => {
          //products available in cart and rendering them to page /cart:        
               res.render(
                    ("shop/cart.ejs"),
                    {
                         products: products,
                         pageTitle: "Shopping Cart",
                         path: "/cart"
                    });
     })
     .catch(err => console.log(err));
 };

//Add to Cart
exports.postCart = (req, res, next) => {
     const id = req.body.Id;
     //fetching the product by ID from Product, we want to add to cart:
     Product.findById(id)
     // in .then() we should have the product we want to add in the cart:
     .then(product => {
          console.log(product.title + " was added to cart successfully!");
          //calling addToCart from /models/user.js model
          return req.user.addtoCart(product);
          //the .then(result) is the result of the update operation
          //in /models/user/addToCart:
          })
     .then(result => {
          res.redirect("/cart");
     })
     .catch(err => console.log(err)); 
   };

//Delete products in cart
exports.postCartDeleteProduct = (req, res, next) => {
     const id = req.body.id;
     
     //get cart for the current user:
     req.user.deleteItemFromCart(id)
     .then(result => {
          res.redirect("/cart");
     })
     // req.product.(id)
     // .then(result => {
     //      console.log("delete result: "+result);
     // })
};

//move all cart items into postOrder
exports.postOrder = (req, res, next) => {
   
     let fetchedCart;
     req.user
     .addOrder()
     .then(result => {
          res.redirect("/orders");
     })
     .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
     req.user
     .getOrders()
     .then(orders => {
          res.render(
               "shop/orders.ejs",
               {
                    orders: orders,
                    pageTitle: "Completed Orders",
                    path: "/orders",     
               });
          // console.log(`Users orders are: ${orders}`)
     })
     .catch(err => console.log("Error getOrders: " + err));
};



 
 
 