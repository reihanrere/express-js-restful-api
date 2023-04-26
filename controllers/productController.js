import productModel from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({
            code: 200,
            data: products
        });
    } catch (error) {
        res.status(500).json({ code: 500,message: error});
    }
}

export const saveProduct = async (req, res) => {
    const product = new productModel(req.body);
    try {
        const products = await product.save();
        res.status(201).json({
            code: 201,
            message: "Data created"
        });
    } catch (error) {
        res.status(400).json({ code: 400,message: error});
    }
}

export const getById = async (req, res) => {
    const cekId = await productModel.findById(req.params.id);
    if (!cekId) return res.status(404).json({ code: 404,message: "Data tidak ditemukan"});
    try {
        const product = await productModel.findOne({ _id : req.params.id });
        res.status(200).json({
            code: 200,
            data: product
        });
    } catch (error) {
        res.status(404).json({ code: 404,message: error});
    }
}

export const updateProduct = async (req, res) => {
    const cekId = await productModel.findById(req.params.id);
    if (!cekId) return res.status(404).json({ code: 404,message: "Data tidak ditemukan"});
    try {
        const products = await productModel.updateOne({ _id: req.params.id}, {$set : req.body});
        res.status(200).json({
            code: 200,
            message: "Data updated"
        });
    } catch (error) {
        res.status(400).json({ code: 400,message: error});
    }
}

export const deleteProduct = async (req, res) => {
    const cekId = await productModel.findById(req.params.id);
    if (!cekId) return res.status(404).json({ code: 404,message: "Data tidak ditemukan"});
    try {
        const product = await productModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            code: 200,
            message: "Data deleted"
        });
    } catch (error) {
        res.status(500).json({ code: 500,message: error});
    }
}

export const getThreeData = async (req, res) => {
    try {
        const checkParams = req.params.data;
        console.log(checkParams.split(','));
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Server internal error"
        })
    }
}