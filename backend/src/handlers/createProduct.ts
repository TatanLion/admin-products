import { Request, Response } from "express";
import Product from "../models/Product.model";
// import { check, validationResult } from 'express-validator';

export const createProduct = async (req: Request, res: Response) => {
    
    const { name, price, availability } = req.body;

    const product = new Product({
        name,
        price,
        availability
    });

    // Validaciones - Aqui se usa el check en funciones y es await porque se interactua con la req
    // await check('name')
    //     .notEmpty().withMessage('Name is required')
    //     .isLength({ min: 4, max: 100 }).withMessage('Name must be between 4 and 100 characters')
    //     .run(req);
    // await check('price')
    //     .notEmpty().withMessage('Price is required')
    //     .isNumeric().withMessage('Price must be a number')
    //     .custom((value) => value > 0).withMessage('Price must be greater than 0')
    //     .run(req);

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    try {
        await product.save();
        res.status(201).json({
            msg: 'Product created',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error creating product',
            error
        });
    }
};