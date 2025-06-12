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
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("eventos", (table) => {
            table.increments("id").primary();
            table.string("nome").notNullable();
            table.text("descricao").notNullable();
            table.date("data").notNullable();
            table.time("horario_inicio").notNullable();
            table.time("horario_fim").notNullable();
            table
                .integer("coordenador_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("coordenadores")
                .onDelete("CASCADE");
            table.timestamps(true, true);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("eventos");
    });
}
