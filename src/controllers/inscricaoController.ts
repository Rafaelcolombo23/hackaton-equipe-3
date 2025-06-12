import { Request, Response } from "express";
import knex from "../database/conexao";
import { z } from "zod";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export async function criarInscricao(req: Request, res: Response) {
  const aluno_id = req.user?.id;

  const criarInscricaoSchema = z.object({
    evento_id: z.number({
      required_error: "Evento é obrigatório.",
      invalid_type_error: "Evento deve ser um número.",
    }),
  });

  try {
    if (!aluno_id) {
      res.status(401).json({ error: "Não autorizado. Faça login." });
      return;
    }

    const { evento_id } = criarInscricaoSchema.parse(req.body);

    const jaInscrito = await knex("inscricoes")
      .where({ aluno_id, evento_id })
      .first();

    if (jaInscrito) {
      res.status(400).json({ error: "Você já está inscrito nesse evento." });
      return;
    }

    const [id] = await knex("inscricoes").insert({
      aluno_id,
      evento_id,
      data_inscricao: knex.fn.now(),
      concluido: true,
    });

    const inscricaoCriada = await knex("inscricoes").where("id", id).first();

    res.status(201).json(inscricaoCriada);
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ erros: error.errors });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Erro ao criar inscrição." });
    return;
  }
}

export async function listarInscricoes(req: Request, res: Response) {
  const aluno_id = req.user?.id;

  if (!aluno_id) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const inscricoes = await knex("inscricoes")
      .where({ aluno_id })
      .join("eventos", "inscricoes.evento_id", "eventos.id")
      .select(
        "inscricoes.id",
        "inscricoes.data_inscricao",
        "eventos.nome as evento",
        "eventos.data"
      );
    res.status(200).json(inscricoes);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar inscrições." });
    return;
  }
}

export async function listarInscricaoPorId(req: Request, res: Response) {
  const aluno_id = req.user?.id;
  const { id } = req.params;

  if (!aluno_id) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const inscricao = await knex("inscricoes")
      .where({ id, aluno_id })
      .join("eventos", "inscricoes.evento_id", "eventos.id")
      .select(
        "inscricoes.id",
        "inscricoes.data_inscricao",
        "eventos.nome as evento",
        "eventos.data"
      )
      .first();

    if (!inscricao) {
      res.status(404).json({ error: "Inscrição não encontrada." });
      return;
    }
    res.status(200).json(inscricao);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar inscrição." });
    return;
  }
}

export async function removerInscricao(req: Request, res: Response) {
  const aluno_id = req.user?.id;
  const { id } = req.params;

  if (!aluno_id) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const inscricao = await knex("inscricoes").where({ id, aluno_id }).first();

    if (!inscricao) {
      res
        .status(404)
        .json({ error: "Inscrição não encontrada ou não pertence a você." });
      return;
    }

    await knex("inscricoes").where({ id }).del();

    res.status(200).json({ mensagem: "Inscrição removida com sucesso." });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover inscrição." });
    return;
  }
}

export async function gerarCertificado(req: Request, res: Response){
  const alunoId = req.user?.id;
  const { eventoId } = req.params;

  try {
    // Busca a inscrição
    const inscricao = await knex("inscricoes")
      .where({ aluno_id: alunoId, evento_id: eventoId })
      .first();

    if (!inscricao || !inscricao.concluido) {
      res
        .status(400)
        .json({ error: "Inscrição não encontrada ou não concluída." });
      return;
    }

    // Busca dados do aluno e evento
    const aluno = await knex("alunos").where({ id: alunoId }).first();
    const evento = await knex("eventos").where({ id: eventoId }).first();

    if (!aluno || !evento) {
      res.status(404).json({ error: "Aluno ou evento não encontrado." });
      return;
    }

    const certPath = path.resolve(
      __dirname,
      `../../certificados-${aluno.id}-${evento.id}.pdf`
    );

    fs.mkdirSync(path.dirname(certPath), { recursive: true });

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(certPath));

    doc.fontSize(20).text("Certificado de Participação", { align: "center" });
    doc.moveDown();
    doc
      .fontSize(14)
      .text(
        `Certificamos que ${aluno.nome} participou do evento "${evento.titulo}" realizado em ${evento.data}.`,
        {
          align: "center",
        }
      );

    doc.end();
    res
      .status(200)
      .json({ message: "Certificado gerado com sucesso!", path: certPath });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar certificado." });
    return;
  }
};
