
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();

      tbl
        .integer('vin', 30)
        .unique()
        .notNullable();

      tbl     
        .string('make', 30)
        .notNullable();
      tbl
        .string('model', 30)
        .unique()
        .notNullable();
      tbl
        .decimal('mileage', 10, 2)
        .notNullable();
      tbl
        .string('transmissionType', 30)
      tbl
        .string('titleStatus', 15)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
