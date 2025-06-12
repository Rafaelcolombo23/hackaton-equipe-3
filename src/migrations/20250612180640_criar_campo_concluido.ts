import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("inscricoes", (table) => {
    table.boolean("concluido").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("inscricoes", (table) => {
    table.dropColumn("concluido");
  });
}
