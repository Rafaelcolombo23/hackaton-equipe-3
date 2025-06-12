import express from 'express';
import { criarAluno } from '../controllers/alunoController';
import { listarAlunos } from '../controllers/alunoController';
import { listarAlunosId } from '../controllers/alunoController';


const router = express.Router();

router.post('/', criarAluno);
router.get('/', listarAlunos);
router.get('/:id', listarAlunosId);

export default router;
