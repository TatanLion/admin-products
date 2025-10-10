import express, { type Express } from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
// @NOTE Database
import { db } from './config/db'
// @NOTE Router
import router from './router'

// Probar la conexión
async function connectDB() {
    try {
        await db.authenticate()
        db.sync() // Sincroniza los modelos con la base de datos
        console.log(colors.green.bold('DB connected'))
    } catch (error) {
        console.log(colors.red.bold(`Error DB: ${error}`))
    }
}
connectDB();

// Crear el servidor
const server : Express = express()

// Habilitar express.json
server.use( express.json() );

// Forma de usar el router
server.use('/api/products', router);

// Docs de la API con Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default server