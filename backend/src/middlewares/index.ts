import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Error processing validation results',
            error
        });
    }

    next();
}    