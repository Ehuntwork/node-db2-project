
exports.up = function(knex) {
  return knex.schema
  .createTable("cars", tbl=>{
      tbl.increments("id");
      tbl.string("VIN").notNullable().unique();
      tbl.string("Make").notNullable().unique();
      tbl.string("Model").notNullable().unique();
      tbl.integer("Millage").notNullable();
      tbl.string("Transmission_Type");
      tbl.string("Title_Status");
  });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("cars")
};
