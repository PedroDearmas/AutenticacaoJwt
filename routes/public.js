import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET

//Cadastro
router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        })
        res.status(201).json(userDB)
    }
    catch (err) {
        res.status(500).json({ message: "Erro no servidor, tente novamente" })
    }

})

//Cadastro
router.post('/login', async (req, res) => {

    try {
        const userInfo = req.body

        //Busca usuario no banco de dados
        const user = await prisma.user.findUnique({
            where: { email: userInfo.email }
        })

        //Verifica se usuario existe dentro do banco de dados
        if (!user){
            return res.status(404).json({message: "Usuario não encontrado"})
        }

        //Compara senhas do banco com a que o usuario digitou
        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Senha inválida"})
        }

        //Gera Token JWT
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1d'})

        res.status(200).json(token)

    }
    catch (err) {
        res.status(500).json({ message: "Erro no servidor, tente novamente" })
    }
})

export default router


//Pedro
//pedrodearmas2003144
//mongodb+srv://Pedro:pedrodearmas2003144@users.g4jwe.mongodb.net/?retryWrites=true&w=majority&appName=Users