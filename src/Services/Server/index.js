const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const Connection = require("../Database/Connection")
const Usuario = require("../Database/Models/Usuario")
const Tarefa = require("../Database/Models/Tarefa")
const jwt = require("jsonwebtoken")

Connection
    .authenticate()
    .then(() => console.log("CONECTADO AO BANCO DE DADOS"))
    .catch((err) => console.error(err))

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/cadastrarUsuario", async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        await Usuario.create({
            nome,
            email,
            senha,
        })
        console.log("Usuário cadastrado com sucesso")
        res.status(200).json({ message: "Usuário cadastrado com sucesso" })
    } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error)
        res.status(500).json({ message: "Erro ao cadastrar usuário" })
    }
})

app.post("/login", async (req, res) => {
    const { email, senha } = req.body
    try {
        const user = await Usuario.findOne({
            where: { email, senha },
        })
        if (user) {
            console.log("Usuário autenticado com sucesso")
            const token = jwt.sign({ userId: user.id }, "chave_secreta")
            res.status(200).json({ token })
        } else {
            console.log("Credenciais inválidas")
            res.status(401).json({ message: "Credenciais inválidas" })
        }
    } catch (error) {
        console.error("Erro ao autenticar usuário: ", error)
        res.status(500).json({ message: "Erro ao autenticar usuário" })
    }
})

app.get("/usuario", async (req, res) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res
                .status(401)
                .json({ message: "Token de autenticação não fornecido" })
        }

        const decoded = jwt.verify(token, "chave_secreta")

        const user = await Usuario.findOne({
            where: { id: decoded.userId },
        })

        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "Usuário não encontrado" })
        }

    } catch (error) {
        console.error("Erro ao obter informações do usuário: ", error)
        res.status(500).json({ message: "Erro ao obter informações do usuário" })
    }
})

app.post("/inserirTarefa", async (req, res) => {
    const tarefa = req.body.tarefa
    const token = req.headers.authorization
    
    if (!token) {
        return res
            .status(401)
            .json({ message: "Token de autenticação não fornecido" })
    }

    const decoded = jwt.verify(token, "chave_secreta")
    const userId = decoded.userId

    try {
        const novaTarefa = await Tarefa.create({
            tarefa: tarefa,
            usuarioId: userId // Associa a tarefa ao usuário autenticado
        })
        console.log("Tarefa inserida com sucesso")
        res.status(200).json({ id: novaTarefa.id, message: "Tarefa inserida com sucesso" })
    } catch (error) {
        console.error("Erro ao inserir tarefa: ", error)
        res.status(500).json({ message: "Erro ao inserir tarefa" })
    }
})


app.get("/receberTarefa", async (req, res) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res
                .status(401)
                .json({ message: "Token de autenticação não fornecido" })
        }

        const decoded = jwt.verify(token, "chave_secreta")
        const userId = decoded.userId

        const tarefas = await Tarefa.findAll({
            where: { usuarioId: userId }, // Filtra as tarefas pelo id do usuário autenticado
            raw: true,
            order: [
                ["id", "ASC"]
            ]
        })

        res.json(tarefas)
    } catch (error) {
        console.error("Erro ao renderizar a tarefa: ", error)
        res.status(500).json({ message: "Erro ao renderizar a tarefa" })
    }
})


app.delete("/removerTarefa/:id", async (req, res) => {
    const tarefaId = req.params.id
    try {
        await Tarefa.destroy({
            where: {
                id: tarefaId
            }
        })
        res.status(200).json({ message: "Tarefa removida com sucesso" })
    } catch (error) {
        console.error("Erro ao remover tarefa", error)
        res.status(500).json({ message: "Erro ao remover tarefa" })
    }
})

app.listen(3001, () => console.log("Servidor on-line..."))