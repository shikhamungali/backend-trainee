const express = require('express');
const router = express.Router();

let players =
    [
        {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ]
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ]
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ]
        },
    ]



router.post('/players',function(req,res){
    for(i=0;i<players.length;i++){
     if (req.body.name == players[i].name){
           return res.send({data:"ERROR!!!!!!(name should be unique)"})
        }
    }

    let c = req.body
    players.push(c)
   return res.send({data:players,status:true})
})

module.exports = router;
// adding this comment for no reason