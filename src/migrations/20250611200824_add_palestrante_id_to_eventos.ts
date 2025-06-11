import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("eventos", (table) => {
    table.integer("palestrante_id").unsigned().notNullable()
      .references("id")
      .inTable("palestrantes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("eventos", (table) => {
    table.dropForeign(["palestrante_id"]);
    table.dropColumn("palestrante_id");
  });
}

