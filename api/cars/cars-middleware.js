const carsModel = require("./cars-model");
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const existCar = await carsModel.getById(req.params.id);
    if(!existCar) {
      res.status(404).json({message: `${req.params.id} kimliğine sahip araba bulunamadı`})
    } else {
      req.existCar = existCar;
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkCarPayload = (req, res, next) => {
  try {
    const requiredFields = ["vin","make","model","mileage"];
    const missingFields = [];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if(!req.body[field]) {
        missingFields.push(field);
      }
    }
    if(missingFields.length > 0) {
      res.status(400).json({message: `${missingFields.toString()} ${missingFields.length == 1 ? "is" : "are"} missing`})
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkVinNumberValid = (req, res, next) => {
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    if(!isValidVin) {
      res.status(400).json({message: `vin ${req.body.vin} is invalid`})
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let existVin = await carsModel.getByVin(req.body.vin);
    if(existVin) {
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkCarId, 
  checkCarPayload, 
  checkVinNumberUnique, 
  checkVinNumberValid
}