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
     }
});
//models are functions we call to connect a schema with a name:
//mongoose takes the model name we defined "Products", turns it
//to all lower case and gives it a pular form. => products. And
//thats what will be displayed as the collection name in the db.
module.exports = mongoose.model("Product", productSchema);
