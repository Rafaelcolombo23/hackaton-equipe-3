import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("palestrantes", (table) => {
    table.dropForeign(["evento_id"]); // remove a foreign key
    table.dropColumn("evento_id");    // remove a coluna
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("palestrantes", (table) => {
    table.integer("evento_id").unsigned();
    table.foreign("evento_id").references("eventos.id");
  });
}