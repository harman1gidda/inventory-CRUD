/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id");
    table.string("part_name");
    table.integer("site_id");
    table.foreign("site_id").references("sites.id");
    table.string("description");
    table.integer("quantity");
    table.date("last_updated");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("inventory", (table) => {
      table.dropForeign("site_id");
    })
    .then(function () {
      return knex.schema.dropTableIfExists("inventory");
    });
};
