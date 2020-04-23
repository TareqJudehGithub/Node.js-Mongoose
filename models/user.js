const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     }, 
     //cart is an embedded item:
     cart: {
     //items: we defined items as an array for cart  (cart.items)
          items: [
               {
      //products and users relations setup:
                    productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product"
                    }, 
                    quantity: {
                              type: Number, 
                              required: true 
                              },
                    title:    {
                                   type: String,
                                   require: true,
                                   ref: "Product"
                              }     
               }
           
          ]
     }
});

//methods
//.methods  allows us to define our own methods:
userSchema.methods.addtoCart = function(product) {

     const cartProductIndex = this.cart.items.findIndex(item => {
          //Checking if the item exists:
          return item.productId.toString() === product._id.toString();
     }); 
      //creating a new array in order to update the cart:
     const updatedCartItems = [...this.cart.items];
     //if the product exists: (not in negative value)
     if(cartProductIndex >= 0){
          updatedCartItems[cartProductIndex].quantity ++;     
     }
     //Or add a new product to the cart:
     else {
          updatedCartItems.push({
               productId: product._id, 
               title: product.title,
               // price: product.price,
               quantity: 1
          });
     }
     const updatedCart = {
          items: updatedCartItems
     };
     //Updating the user db documents cart with added products (check Compass):
     this.cart = updatedCart;
     return this.save();
}
//remove items from cart:
userSchema.methods.removeFromCart = function(productId) {
     const updatedCartItems = this.cart.items.filter(item => {
          return item.id.toString() !== productId.toString()
     });
     this.cart.items = updatedCartItems;
     return this.save();
}

userSchema.methods.clearCart = function() {
     this.cart = { items: [] };
     return this.save();
}
module.exports = mongoose.model("User", userSchema);

