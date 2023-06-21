const Product = require("../models/productSchema");

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(401).json(error);
    }
}

const getProductsBy = async (req, res) => {
    const category = req.body.category;
    try {
        const getProducts = await Product.find({
            category: category
        });
        console.log(getProducts);
        res.status(200).json({ status: `${getProducts}` });
    } catch (error) {
        res.status(401).json({ status: `Some error Occured! ${error}` });
    }
}

const addProducts = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const category = req.body.category;
    try {
        if (title !== null && description !== null && quantity !== null
            && price !== null && category !== null) {
            const addProduct = Product({
                title,
                description,
                quantity,
                price,
                category
            });
            addProduct.save();
            if (addProduct) {
                res.status(200).json({ status: "Product added succussfully!" })
            } else {
                res.status(401).json({ status: "Product has not added!" });
            }
        } else {
            res.status(400).json({ status: "Please fill all the blanks" })
        }

    } catch (error) {
        res.status(401).json(error);
    }
}

const searchProducts = async (req, res) => {
    const title = req.params.title;
    try {
        const searchProduct = await Product.findOne({ title });
        if (!searchProduct) {
            res.status(401).json({ status: "Unauthorized!" })
        } else {
            res.status(200).json({ status: [searchProduct] });
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = { getProducts, addProducts, searchProducts, getProductsBy };