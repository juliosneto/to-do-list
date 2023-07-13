import "./Login.css"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSenha = (e) => {
        setSenha(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dados = { email, senha }
        try {
            const response = await axios.post("http://localhost:3001/login", dados)
            const token = response.data.token
            localStorage.setItem("token", token)
            navigate("/home", { replace: true })
        } catch (err) {
            console.error(err)
        }
    }

    return (
    <div className="pagina-login">
        <div className="container">
            <div className="titulo-site">
                <h1 className="h1-login">to do list</h1>
                <h4 className="h4-login">Sua lista de tarefas</h4>
            </div>
            <div className="borda"></div>
            <div className="formulario">
                <h1>Entrar</h1>
                <form className="form-login" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    id="password"
                    value={senha}
                    onChange={handleSenha}
                />
                <button type="submit" disabled={email === "" || senha === ""}>
                    Entrar
                </button>
                </form>
            </div>
        </div>
        <Link to="/criarconta" className="link">
        Crie sua conta.
        </Link>
    </div>
    )
}