import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("palestrantes", (table) => {
    table.dropForeign(["evento_id"]); 
    table.dropColumn("evento_id");   
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("palestrantes", (table) => {
    table.integer("evento_id").unsigned();
    table.foreign("evento_id").references("eventos.id");
  });
}