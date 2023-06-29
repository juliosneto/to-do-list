import "./Cadastro.css"
import { Link } from "react-router-dom"

export default function Cadastro() {
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
                    <form className="form-cadastro">
                        <input type="text" placeholder="Nome" id="nome"/>
                        <input type="email" placeholder="E-mail" id="email"/>
                        <input type="password" placeholder="Senha" id="password"/>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
            <Link to="/" className="link">Entre na sua conta.</Link>
        </div>
    )
}