const adminController = require("../controllers/admin");

const express = require("express");
const router = express.Router();

router.get("/admin/add-product", adminController.getAddProduct);
router.post("/admin/add-product", adminController.postAddProduct);

router.get("/admin/products", adminController.getAdminProducts);

router.get("/admin/edit-product/:id", adminController.getEditProduct);
router.post("/admin/edit-product", adminController.postEditProduct);

router.post("/admin/delete-product", adminController.postDeleteProduct);
module.exports = router;