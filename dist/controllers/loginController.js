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
exports.login = login;
const conexao_1 = __importDefault(require("../database/conexao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_simples";
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.status(400).json({ error: "Email e senha sao obrigatorios" });
            return;
        }
        try {
            const aluno = yield (0, conexao_1.default)("alunos").where({ email }).first();
            if (!aluno) {
                res.status(400).json({ error: "Email ou senha inválidos." });
                return;
            }
            const senhaCorreta = yield bcrypt_1.default.compare(senha, aluno.senha);
            if (!senhaCorreta) {
                res.status(400).json({ error: "Email ou senha inválidos." });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: aluno.id, ra: aluno.ra, email: aluno.email }, JWT_SECRET, { expiresIn: "1d" });
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao realizar login." });
            return;
        }
    });
}
