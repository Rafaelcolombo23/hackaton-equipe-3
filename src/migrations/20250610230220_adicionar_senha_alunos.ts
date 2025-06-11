import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("alunos", (table) => {
    table.string("senha").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("alunos", (table) => {
    table.dropColumn("senha");
  });
}
