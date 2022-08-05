const express = require('express');
const abc = require('../introduction/intro')
const welCome = require('../logger/logger')
const info = require('../util/helper')
const format = require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()

    welCome.hello()

    info.currentDate()
    info.currentMonth()
    info.batch()

    format.trim()
    format.changetoLowerCase()
    format.changeToUpperCase()

    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason