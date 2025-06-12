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
exports.listarEventos = listarEventos;
exports.listarEventoPorId = listarEventoPorId;
exports.listarEventosInscritos = listarEventosInscritos;
const conexao_1 = __importDefault(require("../database/conexao"));
function listarEventos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventos = yield (0, conexao_1.default)("eventos")
                .join("palestrantes", "eventos.palestrante_id", "palestrantes.id")
                .join("coordenadores", "eventos.coordenador_id", "coordenadores.id")
                .select("eventos.id", "eventos.nome", "eventos.descricao", "eventos.data", "eventos.horario_inicio", "eventos.horario_fim", "palestrantes.nome as palestrante_nome", "palestrantes.tema as palestrante_tema", "coordenadores.nome as coordenador_nome");
            res.status(200).json(eventos);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar eventos." });
            return;
        }
    });
}
function listarEventoPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const evento = yield (0, conexao_1.default)("eventos")
                .join("palestrantes", "eventos.palestrante_id", "palestrantes.id")
                .join("coordenadores", "eventos.coordenador_id", "coordenadores.id")
                .where("eventos.id", id)
                .select("eventos.id", "eventos.nome", "eventos.descricao", "eventos.data", "eventos.horario_inicio", "eventos.horario_fim", "palestrantes.nome as palestrante_nome", "palestrantes.tema as palestrante_tema", "coordenadores.nome as coordenador_nome")
                .first();
            if (!evento) {
                res.status(404).json({ error: "Evento não encontrado." });
                return;
            }
            res.status(200).json(evento);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar evento." });
            return;
        }
    });
}
function listarEventosInscritos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const aluno_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!aluno_id) {
            res.status(401).json({ error: "Não autorizado." });
            return;
        }
        try {
            const eventos = yield (0, conexao_1.default)("inscricoes")
                .where("inscricoes.aluno_id", aluno_id)
                .join("eventos", "inscricoes.evento_id", "eventos.id")
                .select("eventos.id", "eventos.nome", "eventos.data", "eventos.horario_inicio", "eventos.horario_fim");
            res.status(200).json(eventos);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar eventos inscritos." });
            return;
        }
    });
}
