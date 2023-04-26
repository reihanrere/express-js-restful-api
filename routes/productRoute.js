import express from "express";
import verifyToken from "../middleware/authConfig.js";
import { deleteProduct, getById, getProducts, getThreeData, saveProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', verifyToken, getProducts);
productRouter.get('/:id', getById);
productRouter.get('/:data', getThreeData);
productRouter.post('/',saveProduct);
productRouter.patch('/:id',updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;