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
        return knex.schema.createTable("inscricoes", (table) => {
            table.increments("id").primary();
            table
                .integer("aluno_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("alunos")
                .onDelete("CASCADE");
            table
                .integer("evento_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("eventos")
                .onDelete("CASCADE");
            table.timestamp("data_inscricao").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.unique(["aluno_id", "evento_id"]);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("inscricoes");
    });
}
