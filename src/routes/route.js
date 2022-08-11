const express = require('express');
const router = express.Router();

let person = [{
    name: "Shikha",
    age: 23,
    votingStatus: false
},
{
    name: "Anubhav",
    age: 14,
    votingStatus: false
},
{
    name: "Amit",
    age: 25,
    votingStatus: false
},
{
    name: "Naman",
    age: 43,
    votingStatus: false
}
]

router.post('/person', function (req, res) {

   let votingAge = req.query.votingAge
    for (i = 0; i < person.length; i++){
   if (votingAge <= person[i].age){
    person[i].votingStatus = true

   }
}
res.send({data:person})
})




module.exports = router;
// adding this comment for no reason