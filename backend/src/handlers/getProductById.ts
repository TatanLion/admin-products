import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProductById = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    try {
        const product = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({
                msg: `Product with id ${id} not found`
            })
        }
        res.status(200).send({
            data: product
        })

    }catch(error) {
        res.status(500).json({
            msg: `Error getting product by id ${id}}`,
            error: error
        })
    }
    

}