const mongoose = require("mongoose");

//Creating a new schema:
const Schema = mongoose.Schema;

//Here, we define our data schema, and how it will look like:
const productSchema = new Schema({
     title: {
          type: String,
          required: true
     },
     imageUrl: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     userId: {
          type: Schema.Types.ObjectId,
          required: true,
          //products and users relations setup:
          //refering to the "User" model in /models/user.js
          ref: "User" 
     },
     name: {
          type: String,
          required: true,
          ref: "User"
     }
});

module.exports = mongoose.model("Product", productSchema);
