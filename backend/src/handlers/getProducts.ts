import { Request, Response } from "express";
// @NOTE Models - Se importa el modelo y se usa sus metodos para obtener la información
import Product from "../models/Product.model"; 
    
export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            order: [['id', 'ASC']]
        }) || [];
        res.status(200).json({
            data: products
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error getting products',
            error: error.message
        });
    }
}