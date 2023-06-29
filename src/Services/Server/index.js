const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const Connection = require("../Database/Connection")
const Usuario = require("../Database/Models/Usuario")

Connection
    .authenticate()
    .then(() => console.log("CONECTADO AO BANCO DE DADOS"))
    .catch((err) => console.error(err))

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post("/cadastrarUsuario", async(req, res) => {
    const {nome, email, senha} = req.body

    try {
        await Usuario.create({
            nome,
            email,
            senha
        })
        console.log("Usuário cadastrado com sucesso")
    } catch {
        console.error(res.status(500))
    }
})

app.listen(3001, () => console.log("Servidor on-line..."))