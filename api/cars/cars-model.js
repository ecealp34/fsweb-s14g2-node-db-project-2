const db = require("../../data/db-config")

const getAll = () => {
 return db("cars");
}

const getById = (carID) => {
  return db("cars").where("id", carID).first();
}

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
}

const create = async (carEntity) => {
    const [id] = await db("cars").insert(carEntity);
    return getById(id);
}

const updateByCar = async (carID, carEntity) => {
  await db("cars").where("carID", carID).updatedByCar(carEntity)
  return getById(carID);
}

const remove = (carID) => {
  return db("cars").where("id", carID).del();
}


module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  updateByCar,
  remove
}