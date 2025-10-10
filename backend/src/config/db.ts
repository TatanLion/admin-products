import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize( process.env.URL_DATABASE, {
    models: [__dirname + '/../models/*.model.ts'], // Path to the models for sequelize-typescript
    logging: false, // Disable logging; set to console.log to see the raw SQL queries
} )