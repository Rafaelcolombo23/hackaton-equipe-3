import { Request, Response } from "express";
import knex from "../database/conexao";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_simples";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ error: "Email e senha sao obrigatorios" });
    return
  }

  try {
    const aluno = await knex("alunos").where({ email }).first();

    if (!aluno) {
      res.status(400).json({ error: "Email ou senha inválidos." });
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);

    if (!senhaCorreta) {
      res.status(400).json({ error: "Email ou senha inválidos." });
      return;
    }

    const token = jwt.sign(
      { id: aluno.id, ra: aluno.ra, email: aluno.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        ra: aluno.ra,
        curso: aluno.curso,
      },
    });
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login." });
    return;
  }
}
