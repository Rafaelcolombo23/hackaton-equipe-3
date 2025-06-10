import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("palestrantes");
}
