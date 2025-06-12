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
exports.listarPalestrantes = listarPalestrantes;
exports.listarPalestrantePorId = listarPalestrantePorId;
const conexao_1 = __importDefault(require("../database/conexao"));
const baseUrl = process.env.PALESTRANTE_IMG_URL || "";
function listarPalestrantes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const palestrantes = yield (0, conexao_1.default)("palestrantes").select("id", "nome", "minicurriculo", "tema", "foto_url");
            if (!palestrantes || palestrantes.length === 0) {
                res.status(404).json({ mensagem: "Nenhum palestrante encontrado." });
                return;
            }
            const resultado = palestrantes.map((p) => (Object.assign(Object.assign({}, p), { foto_url: `${baseUrl}${p.foto_url}` })));
            res.status(200).json(resultado);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar palestrantes." });
            return;
        }
    });
}
function listarPalestrantePorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const palestrante = yield (0, conexao_1.default)("palestrantes")
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar palestrante." });
            return;
        }
    });
}
