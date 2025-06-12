"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const palestranteController_1 = require("../controllers/palestranteController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/palestrantes", palestranteController_1.listarPalestrantes);
router.get("/palestrantes", palestranteController_1.listarPalestrantePorId);
exports.default = router;
