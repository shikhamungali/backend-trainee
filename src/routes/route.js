const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth = require('../middleware/auth')

/////================================= TEST API ===================================================
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

///// =============================== users API =========================================

router.post("/users", userController.createUser  )

///=============================================== USER LOGIN API ====================================

router.post("/login", userController.loginUser)

//=============================================== USER DATA API ========================================

router.get("/users/:userId",auth.authentication,auth.authorization,auth.params ,userController.getUserData)

///====================================== USER UPDATING API =============================================

router.put("/users/:userId",auth.authentication,auth.authorization,auth.params , userController.updateUser)

///========================================= DELETING A USER API ======================================

router.delete('/users/:userId',auth.authentication,auth.authorization,auth.params ,userController.deleteUser)

module.exports = router;