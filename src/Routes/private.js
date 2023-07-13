import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Private({children}) {

    const navigate = useNavigate()

    useEffect(() => {
    const fetchUser = async() => {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate("/")
                return
            }
            const response = await axios.get("http://localhost:3001/usuario", {
                headers: { Authorization: token },
            })

            console.log(response.data)
        } catch (error) {
            console.error("Erro ao obter as informações do usuário: ", error)
            navigate("/")
        }
    }

    fetchUser()
    }, [navigate])

  return children

}