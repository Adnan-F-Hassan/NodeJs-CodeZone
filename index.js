require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() =>{
    console.log("YaaaaY! connected to the mongoDB server ");
})

const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');

app.use(cors()); // ay orgin ye2dar yeklem el API  

app.use(express.json()); // read el body eno type: json 
// app.use(bodyParser.json()); // de gowa el express // read el body eno type: json 


app.use('/api/courses', coursesRouter) //ay 7aga hategy 3al "/api/courses" haywadeeha lel courses router
// localhost /api/courses ==> /   (from the courses router)

app.use('/api/users', usersRouter)

// global middleware handler for not found router
app.all('*', (req, res, next) => {
    res.status(404).json({status: httpStatusText.ERROR, message: 'NOT FOUND'});
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null})
})

app.listen(process.env.PORT || 4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})