import express from "express";
import { criarAluno } from "../controllers/alunoController";
import { login } from "../controllers/loginController";

const routes = express.Router();


routes.post("/alunos", criarAluno); 
routes.post("/login", login);      

export default routes;