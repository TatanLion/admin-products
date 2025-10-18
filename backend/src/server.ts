import express, { type Express } from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors' // Cors para permitir peticiones desde el frontend
import morgan from 'morgan' // Morgan para ver las peticiones por consola
// @NOTE Swagger
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

// Habilitar CORS
const corsOptions : CorsOptions = {
    origin: (origen, cb) => {
        if(origen === process.env.URL_FRONTEND) {
            cb(null, true)
        } else {
            cb(new Error('No permitido por CORS'))
        }
    },
}
server.use( cors(corsOptions) );

// Habilitar express.json
server.use( express.json() );

// Morgan para ver las peticiones por consola (solo en desarrollo)
server.use( morgan('dev') )

// Forma de usar el router
server.use('/api/products', router);

// Docs de la API con Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default server