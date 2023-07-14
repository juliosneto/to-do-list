import "./Home.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logout from "../imgs/logout.png"
import Check from "../imgs/check.png"

export default function Home () {

    const [nome, setNome] = useState("")
    const [tarefa, setTarefa] = useState("")
    const [tarefas, setTarefas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadTarefas = async () => {
            try {
                const response = await axios.get("http://localhost:3001/receberTarefa")
                setTarefas(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        loadTarefas()
    }, [])

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
            const response = await axios.post("http://localhost:3001/inserirTarefa", {tarefa})
            const novaTarefa = {id: response.data.id, tarefa}
            setTarefas((prevTarefas) => [...prevTarefas, novaTarefa])
            setTarefa("")
        } catch (error) {
            console.error(error)
        }
    }

    const removerTarefa = async(tarefaId) => {
        try {
            await axios.delete(`http://localhost:3001/removerTarefa/${tarefaId}`)
            setTarefas((prevTarefas) => {
               return prevTarefas.filter((tarefa) => tarefa.id !== tarefaId)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="pagina-home">
            <nav>
                <span className="nome-usuario">Bem vindo, {nome}!</span>
                <span className="nav-logo">to do list</span>
                <button className="logout-button" onClick={() => navigate("/")}><img className="img" src={Logout} alt="Símbolo de saída"/></button>
            </nav>
            <main className="container-home">
                <form className="form-home" onSubmit={handleSubmit}>
                    <input 
                        id="tarefa"
                        className="input-tarefa"
                        value={tarefa}
                        onChange={handleTarefa}
                    />
                    <button className="button-tarefa" type="submit" disabled={tarefa === ""}>Adicionar nova tarefa</button>
                </form>
                {tarefas.map((tarefa) => {
                    return (
                        <div className="container-tarefas" key={tarefa.id}>
                            <div className="box-tarefa">
                                <h3 className="tarefa">{tarefa.tarefa}</h3>
                                <button className="check-button" onClick={() => removerTarefa(tarefa.id)}><img className="img" src={Check} alt="Símbolo para tarefa completada"/></button>
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}