import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("alunos", (table) => {
        table.increments("id").primary();
        table.string("nome").notNullable();
        table.string("email").notNullable().unique();
        table.string("curso").notNullable();
        table.integer("ra").notNullable().unique();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable('alunos');
}

