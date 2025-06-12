"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarAluno = criarAluno;
exports.listarAlunos = listarAlunos;
exports.listarAlunosId = listarAlunosId;
const conexao_1 = __importDefault(require("../database/conexao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function gerarRA() {
    return Math.floor(10000 + Math.random() * 90000);
}
function criarAluno(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, email, curso, senha } = req.body;
        if (!nome || !email || !curso || !senha) {
            res.status(400).json({ error: "todos os campos são obrigatórios." });
            return;
        }
        try {
            let raGerado;
            let alunoExistente;
            const emailExistente = yield (0, conexao_1.default)("aluno").where({ email }).first();
            if (emailExistente) {
                res.status(400).json({ error: "Este email ja esta cadastrado" });
                return;
            }
            do {
                raGerado = gerarRA();
                alunoExistente = yield (0, conexao_1.default)("alunos").where("ra", raGerado).first();
            } while (alunoExistente);
            const senhaCrypt = yield bcrypt_1.default.hash(senha, 10);
            const [id] = yield (0, conexao_1.default)("alunos").insert({
                nome,
                email,
                ra: raGerado,
                curso,
                senha: senhaCrypt,
            });
            const alunoCriado = yield (0, conexao_1.default)("alunos").where("id", id).first();
            res.status(201).json(alunoCriado);
        }
        catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                res.status(400).json({ error: "Este e-mail já está cadastrado." });
                return;
            }
            res.status(500).json({ error: "Erro ao cadastrar aluno." });
            return;
        }
    });
}
function listarAlunos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alunos = (0, conexao_1.default)("alunos").select("id", "nome", "email", "curso", "ra", "created_at", "updated_at");
            res.status(200).json(alunos);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar alunos" });
            return;
        }
    });
}
function listarAlunosId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const aluno = yield (0, conexao_1.default)("alunos")
                .where({ id })
                .select("id", "nome", "email", "curso", "ra", "created_at", "updated_at")
                .first();
            if (!aluno) {
                res.status(401).json({ error: "Aluno nao encontrado" });
                return;
            }
            res.status(200).json(aluno);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar o aluno." });
            return;
        }
    });
}
