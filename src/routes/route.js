const express = require('express');
const router = express.Router();
const weatherController = require("../controllers/weatherController")
const memeController = require("../controllers/memeController")
const CowinController = require("../controllers/cowinController")


/////================================= TEST API ===================================================
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//=================================== cowin apis ==========================================================

router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/cowin/getByDistrict", CowinController.getByDistrict) //// ASSIGNMENT QUESTION


//===================================== weather apis ============================================================
router.get("/getweather", weatherController.getweather)
router.get("/gettemp", weatherController.gettemp)
router.get("/getcitytemp", weatherController.getcitytemp)


//===================================== memes apis ===========================================================
router.get("/getmemes", memeController.getmemes)
router.post("/postmemes", memeController.postmeme)

module.exports = router;