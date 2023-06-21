// ESNEK

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const defaultCars = [
  {vin: "1", make: "Toyota", model: "Corolla", mileage:1234},
  {vin: "12", make: "Volkswagen", model: "Golf", mileage:1234},
  {vin: "123", make: "Seat", model: "Leon", mileage:1234 },
  {vin: "1234", make: "Audi", model: "A3", mileage:1234}
];


exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert(defaultCars);
  };
