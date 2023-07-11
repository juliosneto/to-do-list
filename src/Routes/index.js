import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Cadastro from "../Pages/Cadastro";
import Home from "../Pages/Home";
import Private from "./private";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/criarconta" element={<Cadastro />}/>
        <Route path="/home" element={<Private><Home/></Private>}/>
      </Routes>
    </BrowserRouter>
  );
}