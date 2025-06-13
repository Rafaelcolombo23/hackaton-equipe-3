import express from "express";
import { criarAluno } from "../controllers/alunoController";
import {
  listarAlunos,
  listarAlunosId,
  editarAluno,
} from "../controllers/alunoController";
import { autenticarAluno } from "../middlewares/autenticarAluno";

const router = express.Router();

router.post("/", criarAluno);
router.get("/", listarAlunos);
router.get("/:id", listarAlunosId);
router.put("/", autenticarAluno, editarAluno); // aluno

export default router;
