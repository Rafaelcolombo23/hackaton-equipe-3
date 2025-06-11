import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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

        table.unique(["aluno_id", "evento_id"])
    })
}


export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable("inscricoes");
}

