const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get("/solutionOne", function (req, res) {
    let arr = [1, 2, 3, 4, 5, 7, 8, 9]
    let sumOfArr = 1;
    for (let n = 2; n <= 9; n++) {
        sumOfArr = sumOfArr + n
        sumOfArr = sumOfArr - arr[n - 2]
    }
    let missingNo = sumOfArr
    res.send(missingNo + " " + "is the missing no.")
})

router.get('/solutionTwo', function (req, res) {
    let arr = [34, 35, 36, 38, 39]
    let sumOfArr = 34;
    for (let n = 35; n <= 39; n++) {
        sumOfArr = sumOfArr + n
        sumOfArr = sumOfArr - arr[n - 35]
    }
    let missingNo = sumOfArr
    res.send(missingNo + " " + " is the missing no.")
})

module.exports = router;
// adding this comment for no reason