import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import productRoutes from './routes/products.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/products', productRoutes)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')))
app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'views/add.html')))

await mongoose.connect(process.env.MONGO_URI)
app.listen(process.env.PORT)
