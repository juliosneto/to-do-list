import "./Login.css"
import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="pagina">
            <div className="container">
                <div className="titulo-site">
                    <h1 className="h1-login">to do list</h1>
                    <h4 className="h4-login">Sua lista de tarefas</h4>
                </div>
                <div className="borda"></div>
                <div className="formulario">
                    <h1>Entrar</h1>
                    <form className="form-login">
                        <input type="email" placeholder="E-mail" id="email"/>
                        <input type="password" placeholder="Senha" id="password"/>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
            <Link to="/criarconta" className="link">Crie sua conta.</Link>
        </div>
    )
}