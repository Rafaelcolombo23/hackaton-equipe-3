import { Request, Response } from "express";
import knex from "../database/conexao";

const baseUrl = process.env.PALESTRANTE_IMG_URL || "";

export async function listarPalestrantes(req: Request, res: Response) {
  try {
    const palestrantes = await knex("palestrantes").select(
      "id",
      "nome",
      "minicurriculo",
      "tema",
      "foto_url"
    );

    if (!palestrantes || palestrantes.length === 0) {
      res.status(404).json({ mensagem: "Nenhum palestrante encontrado." });
      return;
    }

    const resultado = palestrantes.map((p) => ({
      ...p,
      foto_url: `${baseUrl}${p.foto_url}`,
    }));
    
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
      .where("id", id)
      .select("id", "nome", "minicurriculo", "tema", "foto_url")
      .first();

    if (!palestrante) {
      res.status(404).json({ error: "Palestrante não encontrado." });
      return;
    }

    palestrante.foto_url = `${baseUrl}${palestrante.foto_url}`;

    res.status(200).json(palestrante);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar palestrante." });
    return;
  }
}
