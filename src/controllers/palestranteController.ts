import { Request, Response } from "express";
import knex from "../database/conexao";

const baseUrl = process.env.PALESTRANTE_IMG_URL || "";

export async function listarPalestrantes(req: Request, res: Response) {
  try {
    const dados = await knex("palestrantes")
      .leftJoin("eventos", "palestrantes.id", "=", "eventos.palestrante_id")
      .select(
        "palestrantes.id as palestrante_id",
        "palestrantes.nome",
        "palestrantes.minicurriculo",
        "palestrantes.tema",
        "palestrantes.foto_url",
        "eventos.id as evento_id",
        "eventos.nome",
        "eventos.descricao",
        "eventos.data",
        "eventos.horario_inicio",
        "eventos.horario_fim"
      );

    if (!dados.length) {
      res.status(404).json({ mensagem: "Nenhum palestrante encontrado." });
      return;
    }

    // Agrupar os eventos por palestrante
    const agrupado: any = {};
    for (const item of dados) {
      if (!agrupado[item.palestrante_id]) {
        agrupado[item.palestrante_id] = {
          id: item.palestrante_id,
          nome: item.nome,
          minicurriculo: item.minicurriculo,
          tema: item.tema,
          foto_url: `${baseUrl}${item.foto_url}`,
          eventos: [],
        };
      }

      if (item.evento_id) {
        agrupado[item.palestrante_id].eventos.push({
          id: item.evento_id,
          nome: item.nome,
          descricao: item.descricao,
          data: item.data,
          horario_inicio: item.horario_inicio,
          horario_fim: item.horario_fim,
        });
      }
    }

    const resultado = Object.values(agrupado);
    res.status(200).json(resultado);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar palestrantes." });
    return;
  }
}
export async function listarPalestrantePorId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const palestrante = await knex("palestrantes")
      .where("palestrantes.id", id)
      .first();

    if (!palestrante) {
      res.status(404).json({ error: "Palestrante não encontrado." });
      return;
    }

    const eventos = await knex("eventos")
      .where("eventos.palestrante_id", id)
      .select(
        "eventos.id",
        "eventos.nome",
        "eventos.descricao",
        "eventos.data",
        "eventos.horario_inicio",
        "eventos.horario_fim"
      );

    res.status(200).json({
      ...palestrante,
      foto_url: `${baseUrl}${palestrante.foto_url}`,
      eventos,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar palestrante." });
    return;
  }
}
