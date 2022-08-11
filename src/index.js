const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect("mongodb+srv://Shikhamungali:4t2GRX51VoOU37yQ@cluster0.8hmxve1.mongodb.net/Shikha-Mungali?retryWrites=true&w=majority" ,{
//     useNewUrlParser: true
// })
// .then(() => console.log("MongoDB is connected"))
// .catch( err => console.log(err))

app.use('/', route);



app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

