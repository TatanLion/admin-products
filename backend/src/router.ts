import { Router } from "express";
import { body, param } from "express-validator";
// @NOTE MIDDLEWARES
import { handleInputErrors } from "./middlewares";
// @NOTE HANDLERS
import { getProducts } from "./handlers/getProducts";
import { createProduct } from "./handlers/createProduct";
import { getProductById } from "./handlers/getProductById";
import { updateProduct } from "./handlers/updateProduct";
import { updateAvailability } from "./handlers/updateAvailability";
import { deleteProduct } from "./handlers/deleteProduct";

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Product Name"
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *           example: 99.99
 *         availability:
 *           type: boolean
 *           description: The availability status of the product
 *           example: true
 */



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     description: Retrieve a list of products from the database.
 *     responses:
 *       200:
 *         description: Successfully response with a list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts);



/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     description: Retrieve a product from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully response with the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Product not found
 *       400:
 *         description: Invalid ID supplied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID supplied
 */

router.get('/:id',
    param('id')
        .isInt().withMessage('ID must be an integer')
        .toInt(),
    handleInputErrors,
    getProductById
);



/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Create a new product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *                 example: 99.99
 *               availability:
 *                 type: boolean
 *                 description: The availability status of the product
 *                 example: true
 */

router.post('/',
    // @IMPORTANT Validaciones - Aqui se usa el body en el router y no es await porque no se interactua con la req
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 4, max: 100 }).withMessage('Name must be between 4 and 100 characters'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number')
        .custom((value) => value > 0).withMessage('Price must be greater than 0'),
    // @IMPORTANT Middleware para manejar errores de validacion
    handleInputErrors,
    createProduct
);



/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     description: Update an existing product in the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *                 example: 79.99
 *               availability:
 *                 type: boolean
 *                 description: The availability status of the product
 *                 example: false
 *     responses:
 *       200:
 *         description: Successfully updated the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *       400:
 *         description: Invalid ID supplied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID supplied
 */
router.put('/:id',
    param('id')
        .isInt().withMessage('ID must be an integer'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 4, max: 100 }).withMessage('Name must be between 4 and 100 characters'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number')
        .custom((value) => value > 0).withMessage('Price must be greater than 0'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean'),
    handleInputErrors,
    updateProduct
);



/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update the availability status of a product
 *     tags: [Products]
 *     description: Update the availability status of a product in the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 description: The availability status of the product
 *                 example: false
 *     responses:
 *       200:
 *         description: Successfully updated the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *       400:
 *         description: Invalid ID supplied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID supplied
 */
router.patch('/:id',
    param('id')
        .isInt().withMessage('ID must be an integer')
        .toInt(),
    handleInputErrors,
    updateAvailability
);



/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     description: Delete a product from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted the product.
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *       400:
 *         description: Invalid ID supplied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID supplied
 */
router.delete('/:id',
    param('id')
        .isInt().withMessage('ID must be an integer')
        .toInt(),
    handleInputErrors,
    deleteProduct
);

export default router;
