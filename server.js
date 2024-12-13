import express from 'express'
import publicRoutes from './routes/public.js'

const app = express()

app.use(express.json())

app.use('/', publicRoutes)

app.listen(3000, () => console.log("Servidor rodando!!🚀🚀"))


//Pedro
//pedrodearmas2003144
//mongodb+srv://Pedro:pedrodearmas2003144@users.g4jwe.mongodb.net/?retryWrites=true&w=majority&appName=Users