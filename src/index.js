const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const moment = require('moment')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Shikhamungali:4t2GRX51VoOU37yQ@cluster0.8hmxve1.mongodb.net/populate-db?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use(
    function (req, res, next) {
        const date = moment().format('DD-MM-YYYY, HH:mm:ss');
        const ipAddress = req.ip;
        const URL = req.originalUrl;
        console.log(date, " , ", ipAddress, " , ", URL);
        next();
    }
);



app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
