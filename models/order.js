const mongoose = require("mongoose");

//Creating a new schema:
const Schema = mongoose.Schema;

orderSchema = new Schema({
     products: [
          {
               product: {
                    type: Object, //full document
                    required: true
               },
               quantity: {
                    type: Number,
                    required: true
               }
          }
     ],
     user: {
          name: {
               type: String,
               required: true
          },
          userId: {
               type: Schema.Types.ObjectId,
               required: true,
               ref: "User"
          }

     }
});
module.exports = mongoose.model("Order", orderSchema);
