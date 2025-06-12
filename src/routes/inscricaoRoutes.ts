import { Router } from "express";
import {
  criarInscricao,
  listarInscricoes,
  listarInscricaoPorId,
  removerInscricao,
  gerarCertificado
} from "../controllers/inscricaoController";
import { autenticarAluno } from "../middlewares/autenticarAluno";

const router = Router();

router.use(autenticarAluno);

router.post("/", criarInscricao);
router.get("/", listarInscricoes);
router.get("/:id", listarInscricaoPorId);
router.delete("/:id", removerInscricao);
router.get("/:eventoId/certificado", gerarCertificado);

export default router;