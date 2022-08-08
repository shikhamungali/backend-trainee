const express = require('express');
const router = express.Router();


router.get('/movies/', function (req, res) {
    let movies = ['Rang de Basanti', 'The Shining', 'Conjuring', 'Harry potter']

    res.send(movies)
})

router.get('/movies/:indexNumber', function (req, res) {
    let movies = ['Rang de Basanti', 'The Shining', 'Conjuring', 'Harry potter']

    if (req.params['indexNumber'] <= 3) {
        res.send(movies[req.params['indexNumber']])
    }
    else {
        res.send("Enter valid indexnumber.")
    }
})


router.get('/films/', function (req, res) {
    let films = [{ id: 1, name: 'Rang de Basanti' }, { id: 2, name: 'The Shining' }, { id: 3, name: 'Conjuring' }, { id: 4, name: 'Harry potter' }]

    res.send(films)

})


router.get('/films/:filmId', function (req, res) {
    let films = [{ id: 1, name: 'Rang de Basanti' }, { id: 2, name: 'The Shining' }, { id: 3, name: 'Conjuring' }, { id: 4, name: 'Harry potter' }]

    if (req.params['filmId'] <= 4) {
        res.send(films[req.params['filmId'] - 1])
    }
    else {
        res.send("Enter valid flimId.")
    }
})





module.exports = router;
// adding this comment for no reason