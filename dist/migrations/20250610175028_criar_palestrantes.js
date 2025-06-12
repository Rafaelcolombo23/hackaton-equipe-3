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
        return knex.schema.createTable("palestrantes", (table) => {
            table.increments("id").primary();
            table.string("nome").notNullable();
            table.text("minicurriculo").notNullable();
            table.string("foto_url").nullable();
            table.string("tema").nullable();
            table
                .integer("evento_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("eventos")
                .onDelete("CASCADE");
            table.timestamps(true, true);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("palestrantes");
    });
}
