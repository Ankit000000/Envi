require('dotenv').config();
const express = require('express');

const carpoolRoutes = require('./Routes/carpool');
const userRoutes = require('./Routes/user');

const mongoose = require('mongoose');

const app = express();


// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/carpool', carpoolRoutes);
app.use('/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, (req, res) => {
        console.log(`The BackEnd server is started on PORT ${process.env.PORT} and connected to the db`);
    })
})
.then((err) => {
    console.log(err);
})
