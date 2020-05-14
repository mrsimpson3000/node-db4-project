exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments();
      tbl.text("recipe_name", 128).unique().notNullable();
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments();
      tbl.text("ingredient_name", 128).unique().notNullable();
    })
    .createTable("measurements", (tbl) => {
      tbl.increments();
      tbl.text("measurement_name", 128).unique().notNullable();
    })
    .createTable("steps", (tbl) => {
      tbl.increments();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.integer("step_number").unsigned().notNullable();
      tbl.text("step_description", 255).notNullable();
    })
    .createTable("quantity", (tbl) => {
      tbl.increments();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredients.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("ingredient_measurement")
        .unsigned()
        .notNullable()
        .references("measurements.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.float("ingredient_quantity").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("quantity")
    .dropTableIfExists("steps")
    .dropTableIfExists("measurements")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes");
};
