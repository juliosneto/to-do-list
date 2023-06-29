import "./Cadastro.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"



export default function Cadastro() {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleNome = (e) => {
        setNome(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSenha = (e) => {
        setSenha(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dados = {nome, email, senha}
        await axios.post("http://localhost:3001/cadastrarUsuario", dados)
    }

    return (
        <div className="pagina">
            <div className="container">
                <div className="titulo-site">
                    <h1 className="h1-cadastro">to do list</h1>
                    <h4 className="h4-cadastro">Sua lista de tarefas</h4>
                </div>
                <div className="borda"></div>
                <div className="formulario">
                    <h1>Criar conta</h1>
                    <form className="form-cadastro" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nome" id="nome" value={nome} onChange={handleNome}/>
                        <input type="email" placeholder="E-mail" id="email" value={email} onChange={handleEmail}/>
                        <input type="password" placeholder="Senha" id="password" value={senha} onChange={handleSenha}/>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
            <Link to="/" className="link">Entre na sua conta.</Link>
        </div>
    )
}