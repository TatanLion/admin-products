import { Request, Response } from "express";
import Product from "../models/Product.model";

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ 
            msg: `Product with id ${id} not found` 
        });
    }

    try {
        // @NOTE Actualizar solo el campo de availability - PATCH no es necesario traer todo el producto
        // @NOTE Si se envia true, se pone en false y viceversa
        product.availability = !product.availability;
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