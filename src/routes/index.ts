import { Router } from "express";

import alunoRoutes from "./alunoRoutes";
import eventoRoutes from "./eventoRoutes";
import inscricaoRoutes from "./inscricaoRoutes";
import palestranteRoutes from "./palestrantesRoutes";
import coordenadorRoutes from "./coordenadorRoutes";
import { login } from "../controllers/loginController";

const routes = Router();

routes.post("/login", login);
routes.use("/alunos", alunoRoutes);
routes.use("/eventos", eventoRoutes);
routes.use("/inscricoes", inscricaoRoutes);
routes.use("/palestrantes", palestranteRoutes);
routes.use("/coordenadores", coordenadorRoutes);

export default routes;