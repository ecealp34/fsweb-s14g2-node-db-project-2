const db = require("../../data/db-config")

const getAll = () => {
 return db("Cars");
}

const getById = (carID) => {
  return db("Cars").where("id", carID).first();
}

const getByVin = (vin) => {
  return db("Cars").where("vin", vin).first();
}

const create = async (carEntity) => {
    const [id] = await db("Cars").insert(carEntity);
    return getById(id);
}

const updateByCar = async (carID, carEntity) => {
  await db("Cars").where("carID", carID).updatedByCar(carEntity)
  return getById(carID);
}

const remove = (carID) => {
  return db("Cars").where("id", carID).del();
}


module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  updateByCar,
  remove
}