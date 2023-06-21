const express = require("express");
const {getProducts, addProducts, searchProducts, getProductsBy} = require("../controllers/productController");
const router = express.Router();

router.post("/addProducts", addProducts);
router.get("/getProducts", getProducts);
router.get("/searchProducts", searchProducts);
router.get("/getSearchProduct", getProductsBy);

module.exports = router;