require('dotenv').config();
const express = require('express');

const app = express();

const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() =>{
    console.log("YaaaaY! connected to the mongoDB server ");
})

const coursesRouter = require('./routes/courses.route');

app.use(express.json()); // read el body eno type: json 
// app.use(bodyParser.json()); // de gowa el express // read el body eno type: json 


app.use('/api/courses', coursesRouter) //ay 7aga hategy 3al "/api/courses" haywadeeha lel courses router
// localhost /api/courses ==> /   (from the courses router)

//middle ware handler
app.all('*', (req, res, next) => {
    res.status(404).json({status: httpStatusText.ERROR, message: 'NOT FOUND'});
})

app.listen(process.env.PORT || 4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})