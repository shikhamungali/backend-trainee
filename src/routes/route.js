const express = require('express');
const router = express.Router();


router.get('/films/', function (req, res) {
    let movies = ['Rang de Basanti', 'The Shining', 'Conjuring', 'Harry potter']

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

    if (req.params['indexNumber'] <= 3) {
        res.send(movies[req.params['indexNumber']])
    }
    else {
        res.send("indexNumber not found.")
    }
})


router.get('/movies/', function (req, res) {
    let films = [{ id: 1, name: 'Rang de Basanti' }, { id: 2, name: 'The Shining' }, { id: 3, name: 'Conjuring' }, { id: 4, name: 'Harry potter' }]

    res.send(films)

})


router.get('/movies/:keyId', function (req, res) {
    let films = [{ id: 1, name: 'Rang de Basanti' }, { id: 2, name: 'The Shining' }, { id: 3, name: 'Conjuring' }, { id: 4, name: 'Harry potter' }]
    // if (req.params['keyId'] === 0) {
    //     res.send("movie not found.")
    // }
    if (req.params['keyId'] <= 4) {
        res.send(films[req.params['keyId'] - 1])
    }
    else {
        res.send("movie  not found.")
    }

    // res.send(films)
})





module.exports = router;
// adding this comment for no reason