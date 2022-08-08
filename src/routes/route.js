const express = require('express');
const lodash = require('lodash')

const abc = require('../introduction/intro')
const welCome = require('../logger/logger.js')
const info = require('../util/helper')
const format = require('../validator/formatter')
const router = express.Router();

// router.get('/test-me', function (req, res) {
//     console.log('My batch is', abc.name)
//     abc.printName()

//     welCome.hello()

//     info.currentDate()
//     info.currentMonth()
//     info.batch()

//     format.trim()
//     format.changetoLowerCase()
//     format.changeToUpperCase()

//     res.send('My second ever api!')
// });

router.get('/hello', function(req, res){
  let x = ["Januaray","Febuary","March","April","May","June","July","August","September","October","November","Decembet"]
  console.log(lodash.chunk(x,3))

  let odd = [1,3,5,7,9,11,13,15,17,19]
  console.log(lodash.tail(odd))

  let one = [1,2,3,4]
  let two = [2,3,4]
  let three = [4,5,6]
  let four = [5,6,7]
  let five = [6,7,8,9]
  console.log(lodash.union(one,two,three,four,five))

    let movies = [["horror","The Shining"],["drama","Titanic"], ["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    console.log(lodash.fromPairs(movies))

    res.send(' Hello , My second ever api!')

});













router.get('/films/', function(req, res){
    let movies = ['Rang de Basanti','The Shining','Conjuring','Harry potter']
    
    res.send(movies)
})

// router.get('/films/:indexNumber', function (req, res) {
    //     let movies = ['Rang de Basanti', 'The Shining', 'Conjuring', 'Harry potter']
    //     // for(i=0;i<=(movies.length-1);i++){
//         // console.log(req.params['indexNumber'])
//     // }
//     res.send(movies[req.params['indexNumber']])
//     // console.log(JSON.stringify(req.params))
// })
router.get('/films/:indexNumber', function (req, res) {
    let movies = ['Rang de Basanti', 'The Shining', 'Conjuring', 'Harry potter']
   
 if (req.params['indexNumber'] <=3){
     res.send(movies[req.params['indexNumber']])
    }
    else{
        res.send("indexNumber not found.")
    }
})

router.get('/movies/:keyId', function(req, res){
    let films = [{id:1,name:'Rang de Basanti'}, {id:2,name:'The Shining'}, {id:3,name:'Conjuring'}, {id:4,name:'Harry potter'}]
    // if (req.params['keyId'] === 0) {
    //     res.send("movie not found.")
    // }
    if (req.params['keyId']<=4) {
        res.send(films[req.params['keyId']-1])
    }
    else{
        res.send("movie  not found.")
    }

    // res.send(films)
})



module.exports = router;
// adding this comment for no reason