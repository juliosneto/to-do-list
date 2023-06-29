import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login"
import Cadastro from "../Pages/Cadastro";

export default function Rotas () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/criarconta" element={<Cadastro/>}/>
            </Routes>
        </BrowserRouter>
    )
}