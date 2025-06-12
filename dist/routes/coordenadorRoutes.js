"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coordenadorController_1 = require("../controllers/coordenadorController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/coordenadores", coordenadorController_1.listarCoordenadorPorId);
router.get("/coordenadores", coordenadorController_1.listarCoordenadores);
exports.default = router;
