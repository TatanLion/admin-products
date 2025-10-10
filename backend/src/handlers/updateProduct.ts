import { Request, Response } from "express";
import Product from "../models/Product.model";

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ 
            msg: 'Product not found' 
        });
    }

    try {
        // @NOTE Usar update para PUT porque se espera que se envien todos los campos del producto, si no se envian, se ponen en null o se borran
        await product.update(req.body);
        await product.save();
        res.status(200).json({ 
            msg: 'Product updated successfully', 
            data: product 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            msg: 'Error updating product',
            error: error.msg
        });
    }

}