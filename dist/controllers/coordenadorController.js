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
exports.listarCoordenadores = listarCoordenadores;
exports.listarCoordenadorPorId = listarCoordenadorPorId;
const conexao_1 = __importDefault(require("../database/conexao"));
function listarCoordenadores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coordenadores = yield (0, conexao_1.default)("coordenadores").select("id", "nome", "email", "created_at", "updated_at");
            if (!coordenadores || coordenadores.length === 0) {
                res.status(404).json({ mensagem: "Nenhum coordenador encontrado." });
                return;
            }
            res.status(200).json(coordenadores);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar coordenadores." });
            return;
        }
    });
}
function listarCoordenadorPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const coordenador = yield (0, conexao_1.default)("coordenadores")
                .where("id", id)
                .select("id", "nome", "email", "created_at", "updated_at")
                .first();
            if (!coordenador) {
                res.status(404).json({ mensagem: "Coordenador não encontrado." });
                return;
            }
            res.status(200).json(coordenador);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar coordenador." });
            return;
        }
    });
}
