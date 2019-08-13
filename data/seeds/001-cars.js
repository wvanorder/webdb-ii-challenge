
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 123412354345, make: 'Toyota', model: '4Runner', mileage: 87643, transmissionType: 'manual'},
        {vin: 7687855, make: 'Ford', model: 'F 150', mileage: 23433, titleStatus: 'clean',},
        {vin: 34563456534, make: 'Chevrolet', model: 'Tahoe', mileage: 10, transmissionType: 'automatic', titleStatus: 'restructured',}
      ]);
    });
};
