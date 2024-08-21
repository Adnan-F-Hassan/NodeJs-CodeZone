const express = require('express');

const app = express();

const mongoose = require('mongoose');

const url = "mongodb+srv://edenfarid:nodejs_123@learn-mongodb.6kues.mongodb.net/codeZone?retryWrites=true&w=majority&appName=learn-MongoDB";

mongoose.connect(url).then(() =>{
    console.log("YaaaaY! connected to the mongoDB server ");
})

const coursesRouter = require('./routes/courses.route');

app.use(express.json()); // read el body eno type: json 
// app.use(bodyParser.json()); // de gowa el express // read el body eno type: json 


app.use('/api/courses', coursesRouter) //ay 7aga hategy 3al "/api/courses" haywadeeha lel courses router
// localhost /api/courses ==> /   (from the courses router)


app.listen(4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})