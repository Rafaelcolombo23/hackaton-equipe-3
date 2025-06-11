import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable("eventos");
}

