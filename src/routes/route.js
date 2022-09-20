const express = require('express');
const router = express.Router();













//======================== to check if the endpoint is correct or not =========================================
router.all("/**", function (req, res) {         
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})





module.exports = router;