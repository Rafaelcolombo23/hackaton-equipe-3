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
exports.criarInscricao = criarInscricao;
exports.listarInscricoes = listarInscricoes;
exports.listarInscricaoPorId = listarInscricaoPorId;
exports.removerInscricao = removerInscricao;
const conexao_1 = __importDefault(require("../database/conexao"));
const zod_1 = require("zod");
function criarInscricao(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const aluno_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const criarInscricaoSchema = zod_1.z.object({
            evento_id: zod_1.z.number({
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
            const jaInscrito = yield (0, conexao_1.default)("inscricoes")
                .where({ aluno_id, evento_id })
                .first();
            if (jaInscrito) {
                res.status(400).json({ error: "Você já está inscrito nesse evento." });
                return;
            }
            const [id] = yield (0, conexao_1.default)("inscricoes").insert({
                aluno_id,
                evento_id,
                data_inscricao: conexao_1.default.fn.now(),
            });
            const inscricaoCriada = yield (0, conexao_1.default)("inscricoes").where("id", id).first();
            res.status(201).json(inscricaoCriada);
            return;
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ erros: error.errors });
                return;
            }
            console.error(error);
            res.status(500).json({ error: "Erro ao criar inscrição." });
            return;
        }
    });
}
function listarInscricoes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const aluno_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!aluno_id) {
            res.status(401).json({ error: "Não autorizado." });
            return;
        }
        try {
            const inscricoes = yield (0, conexao_1.default)("inscricoes")
                .where({ aluno_id })
                .join("eventos", "inscricoes.evento_id", "eventos.id")
                .select("inscricoes.id", "inscricoes.data_inscricao", "eventos.nome as evento", "eventos.data");
            res.status(200).json(inscricoes);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar inscrições." });
            return;
        }
    });
}
function listarInscricaoPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const aluno_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { id } = req.params;
        if (!aluno_id) {
            res.status(401).json({ error: "Não autorizado." });
            return;
        }
        try {
            const inscricao = yield (0, conexao_1.default)("inscricoes")
                .where({ id, aluno_id })
                .join("eventos", "inscricoes.evento_id", "eventos.id")
                .select("inscricoes.id", "inscricoes.data_inscricao", "eventos.nome as evento", "eventos.data")
                .first();
            if (!inscricao) {
                res.status(404).json({ error: "Inscrição não encontrada." });
                return;
            }
            res.status(200).json(inscricao);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar inscrição." });
            return;
        }
    });
}
function removerInscricao(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const aluno_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { id } = req.params;
        if (!aluno_id) {
            res.status(401).json({ error: "Não autorizado." });
            return;
        }
        try {
            const inscricao = yield (0, conexao_1.default)("inscricoes").where({ id, aluno_id }).first();
            if (!inscricao) {
                res
                    .status(404)
                    .json({ error: "Inscrição não encontrada ou não pertence a você." });
                return;
            }
            yield (0, conexao_1.default)("inscricoes").where({ id }).del();
            res.status(200).json({ mensagem: "Inscrição removida com sucesso." });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao remover inscrição." });
            return;
        }
    });
}
