import { Request, Response } from "express";
import knex from "../database/conexao";

export async function listarEventos(req: Request, res: Response) {
  try {
    const eventos = await knex("eventos")
      .join("palestrantes", "eventos.palestrante_id", "palestrantes.id")
      .join("coordenadores", "eventos.coordenador_id", "coordenadores.id")
      .select(
        "eventos.id",
        "eventos.nome",
        "eventos.descricao",
        "eventos.data",
        "eventos.horario_inicio",
        "eventos.horario_fim",
        "palestrantes.nome as palestrante_nome",
        "palestrantes.tema as palestrante_tema",
        "coordenadores.nome as coordenador_nome"
      );
    res.status(200).json(eventos);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar eventos." });
    return;
  }
}

export async function listarEventoPorId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const evento = await knex("eventos")
      .join("palestrantes", "eventos.palestrante_id", "palestrantes.id")
      .join("coordenadores", "eventos.coordenador_id", "coordenadores.id")
      .where("eventos.id", id)
      .select(
        "eventos.id",
        "eventos.nome",
        "eventos.descricao",
        "eventos.data",
        "eventos.horario_inicio",
        "eventos.horario_fim",
        "palestrantes.nome as palestrante_nome",
        "palestrantes.tema as palestrante_tema",
        "coordenadores.nome as coordenador_nome"
      )
      .first();

    if (!evento) {
      res.status(404).json({ error: "Evento não encontrado." });
      return;
    }
    res.status(200).json(evento);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar evento." });
    return;
  }
}

export async function listarEventosInscritos(req: Request, res: Response) {
  const aluno_id = req.user?.id;

  if (!aluno_id) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const eventos = await knex("inscricoes")
      .where("inscricoes.aluno_id", aluno_id)
      .join("eventos", "inscricoes.evento_id", "eventos.id")
      .select(
        "eventos.id",
        "eventos.nome",
        "eventos.data",
        "eventos.horario_inicio",
        "eventos.horario_fim"
      );
    res.status(200).json(eventos);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar eventos inscritos." });
    return;
  }
}
