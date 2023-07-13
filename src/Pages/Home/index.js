import "./Home.css"
import axios from "axios"
import { useEffect, useState } from "react"
import Logout from "../imgs/logout.png"

export default function Home () {

    const [nome, setNome] = useState("")
    const [tarefa, setTarefa] = useState("")

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get("http://localhost:3001/usuario", {
                    headers: { Authorization: token },
                })
                setNome(response.data.nome)
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchUser()
        }, [])

    const handleTarefa = (e) => {
        setTarefa(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3001/inserirTarefa", tarefa)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="pagina-home">
            <nav>
                <span className="nome-usuario">Bem vindo, {nome}!</span>
                <span className="nav-logo">to do list</span>
                <button className="logout-button"><img className="img-logout" src={Logout} alt="Símbolo de saída"/></button>
            </nav>
            <main className="container-home">
                <form className="form-home" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        id="tarefa"
                        className="input-tarefa"
                        value={tarefa}
                        onChange={handleTarefa}
                    />
                    <button className="button-tarefa" type="submit" disabled={tarefa === ""}>Adicionar nova tarefa</button>
                </form>
            </main>
        </div>
    )
}