import { Request, Response } from "express";
import Product from "../models/Product.model";

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if(!product){
         return res.status(404).json({
            msg: `Product with id ${id} not found`
        })
    }

    try {
        await product.destroy();
        res.status(200).json({
            msg: "Product deleted successfully",
            data: product
        })
    }catch(error){
        res.status(500).json({
            msg: "Error deleting product",
            error: error.message
        })
    }
}