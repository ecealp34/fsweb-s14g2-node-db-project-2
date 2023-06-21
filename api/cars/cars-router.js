
const router = require("express").Router();
const carsModel = require("./cars-model");
const mw = require("./cars-middleware");

router.get("/", async (req,res,next)=> {
    try {
       const allCars = await carsModel.getAll();
       res.json(allCars);
    } catch (error) {
       next(error); 
    }
})

router.get("/:id",mw.checkCarId,(req,res,next) => {
    try {
        res.json(req.existCar);
    } catch (error) {
        next(error); 
    }
})

router.post("/",mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, async (req,res,next) => {
    try {
       const insertedCar = await carsModel.create(req.body);
       res.status(201).json(insertedCar);
    } catch (error) {
      next(error);  
    }
})


router.put("/:id",mw.checkCarId, mw.checkCarPayload, mw.checkVinNumberUnique, async (req,res,next) => {
    try {
     const updated = {
        vin:req.body.vin,
        make:req.body.make,
        model:req.body.model,
        mileage:req.body.mileage
     }
     const updatedCar = await carsModel.update(req.params.id, updated);
     res.json(updatedCar);
    } catch (error) {
        next(error);   
    }
})

router.delete("/:id",mw.checkCarId,async (req,res,next) => {
    try {
       await carsModel.remove(req.params.id);
       res.json({message:`${req.params.id} has been deleted`})
    } catch (error) {
        next(error);    
    }
})

module.exports = router;
