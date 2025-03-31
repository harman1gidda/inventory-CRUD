/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("inventory").del();
  await knex("inventory").insert([
    {
      part_name: "computer chip",
      site_id: 1,
      description: "High performance computer chip",
      quantity: 100,
      last_updated: "2025-03-31",
    },
    {
      part_name: "motherboard",
      site_id: 2,
      description: "Latest model motherboard",
      quantity: 50,
      last_updated: "2025-03-31",
    },
    {
      part_name: "graphics card",
      site_id: 3,
      description: "Top-tier graphics card",
      quantity: 30,
      last_updated: "2025-03-31",
    },
  ]);
};
