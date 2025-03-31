/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.schema.raw("TRUNCATE sites CASCADE");
  await knex("sites").del();
  await knex("sites").insert([
    { name: "Los Angeles" },
    { name: "New York" },
    { name: "Denver" },
  ]);
};
