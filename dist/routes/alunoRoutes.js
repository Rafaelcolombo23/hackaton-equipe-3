"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alunoController_1 = require("../controllers/alunoController");
const alunoController_2 = require("../controllers/alunoController");
const alunoController_3 = require("../controllers/alunoController");
const router = express_1.default.Router();
router.post('/alunos', alunoController_1.criarAluno);
router.get('/alunos', alunoController_2.listarAlunos);
router.get('/alunos', alunoController_3.listarAlunosId);
exports.default = router;
