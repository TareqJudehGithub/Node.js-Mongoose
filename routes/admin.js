const adminController = require("../controllers/admin");

const express = require("express");
const router = express.Router();

router.get("/admin/add-product", adminController.getAddProduct);
router.post("/admin/add-product", adminController.postAddProduct);

router.get("/admin/products", adminController.getAdminProducts);


module.exports = router;