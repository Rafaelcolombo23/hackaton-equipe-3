import { Request, Response } from "express";
import knex from "../database/conexao";
import bcrypt from "bcrypt";

function gerarRA(): number {
  return Math.floor(10000 + Math.random() * 90000);
}

export async function criarAluno(req: Request, res: Response) {
  const { nome, email, curso, senha } = req.body;

  if (!nome || !email || !curso || !senha) {
    res.status(400).json({ error: "todos os campos são obrigatórios." });
    return;
  }

  try {
    let raGerado: number;
    let alunoExistente;

    const emailExistente = await knex("aluno").where({ email }).first();

    if (emailExistente) {
      res.status(400).json({ error: "Este email ja esta cadastrado" });
      return;
    }

    do {
      raGerado = gerarRA();
      alunoExistente = await knex("alunos").where("ra", raGerado).first();
    } while (alunoExistente);

    const senhaCrypt = await bcrypt.hash(senha, 10);

    const [id] = await knex("alunos").insert({
      nome,
      email,
      ra: raGerado,
      curso,
      senha: senhaCrypt,
    });

    const alunoCriado = await knex("alunos").where("id", id).first();
    res.status(201).json(alunoCriado);
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Este e-mail já está cadastrado." });
      return;
    }

    res.status(500).json({ error: "Erro ao cadastrar aluno." });
    return;
  }
}

export async function listarAlunos(req: Request, res: Response) {
  try {
    const alunos = knex("alunos").select(
      "id",
      "nome",
      "email",
      "curso",
      "ra",
      "created_at",
      "updated_at"
    );

    res.status(200).json(alunos);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar alunos" });
    return;
  }
}

export async function listarAlunosId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const aluno = await knex("alunos")
      .where({ id })
      .select("id", "nome", "email", "curso", "ra", "created_at", "updated_at")
      .first();

    if (!aluno) {
      res.status(401).json({ error: "Aluno nao encontrado" });
      return;
    }

    res.status(200).json(aluno);
  } catch (error: any) {
    res.status(500).json({ error: "Erro ao buscar o aluno." });
    return;
  }
}
