import { Request, Response } from "express";
import knex from "../database/conexao";

export async function listarCoordenadores(req: Request, res: Response) {
  try {
    const coordenadores = await knex("coordenadores").select(
      "id",
      "nome",
      "email",
      "created_at",
      "updated_at"
    );

    if (!coordenadores || coordenadores.length === 0) {
      res.status(404).json({ mensagem: "Nenhum coordenador encontrado." });
      return;
    }
    res.status(200).json(coordenadores);
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
    const coordenador = await knex("coordenadores")
      .where("id", id)
      .select("id", "nome", "email", "created_at", "updated_at")
      .first();

    if (!coordenador) {
      res.status(404).json({ mensagem: "Coordenador não encontrado." });
      return;
    }
    res.status(200).json(coordenador);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar coordenador." });
    return;
  }
}
