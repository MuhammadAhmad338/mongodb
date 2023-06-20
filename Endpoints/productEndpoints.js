const express = require("express");
const {getProducts, addProducts, searchProducts} = require("../controllers/productController");
const router = express.Router();

router.post("/addProducts", addProducts);
router.get("/getProducts", getProducts);
router.get("/searchProducts", searchProducts);

module.exports = router;