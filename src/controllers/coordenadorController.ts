import { Request, Response } from "express";
import knex from "../database/conexao";

export async function listarCoordenadores(req: Request, res: Response) {
  try {
    const dados = await knex("coordenadores")
      .leftJoin("eventos", "coordenadores.id", "=", "eventos.coordenador_id")
      .select(
        "coordenadores.id as coordenador_id",
        "coordenadores.nome",
        "coordenadores.email",
        "eventos.id as evento_id",
        "eventos.nome as evento_nome",
        "eventos.descricao",
        "eventos.data",
        "eventos.horario_inicio",
        "eventos.horario_fim"
      );

    if (!dados.length) {
      res.status(404).json({ mensagem: "Nenhum coordenador encontrado." });
      return;
    }

    const agrupado: any = {};
    for (const item of dados) {
      if (!agrupado[item.coordenador_id]) {
        agrupado[item.coordenador_id] = {
          id: item.coordenador_id,
          nome: item.nome,
          email: item.email,
          eventos: [],
        };
      }

      if (item.evento_id) {
        agrupado[item.coordenador_id].eventos.push({
          id: item.evento_id,
          nome: item.evento_nome,
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
    res.status(500).json({ error: "Erro ao listar coordenadores." });
    return;
  }
}

export async function listarCoordenadorPorId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const coordenador = await knex("coordenadores").where("id", id).first();

    if (!coordenador) {
      res.status(404).json({ error: "Coordenador não encontrado." });
      return;
    }

    const eventos = await knex("eventos")
      .where("coordenador_id", id)
      .select(
        "id",
        "nome",
        "descricao",
        "data",
        "horario_inicio",
        "horario_fim"
      );
    res.status(200).json({
      ...coordenador,
      eventos,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar coordenador." });
    return;
  }
}
