import express from 'express';
import { criarAluno } from '../controllers/alunoController';
import { listarAlunos } from '../controllers/alunoController';
import { listarAlunosId } from '../controllers/alunoController';


const router = express.Router();

router.post('/alunos', criarAluno);
router.get('/alunos', listarAlunos);
router.get('/alunos', listarAlunosId);

export default router;
