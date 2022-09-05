

// imports
const express = require('express');
const cors = require('cors')
// for loggin in
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


// for enviroiment varaibels
require('dotenv').config(); // this will allow access for all files using process.env.key!

// retrive the key
// console.log(process.env.key);

const app = express();

const port = 8000;
require('./server/config/mongoose.config');



// * updated cors() for logged in
// app.use(cors()) 
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.json(), express.urlencoded({ extended: true }));
// for loggin in
app.use(cookieParser());

// Routes for server
require('./server/routes/event.routes')(app); // This is new
require('./server/routes/user.routes')(app); // This is new


// for userToken
// const payload = {
//     id: user._id
// };

// // notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);



// Change the app.use(cors()) to the one below



app.listen(port, () => console.log(`Listening on port: ${port}`) );