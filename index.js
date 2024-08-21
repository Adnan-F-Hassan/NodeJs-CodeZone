const express = require('express');

const app = express();

const coursesRouter = require('./routes/courses.route');

app.use(express.json()); // read el body eno type: json 
// app.use(bodyParser.json()); // de gowa el express // read el body eno type: json 


app.use('/api/courses', coursesRouter) //ay 7aga hategy 3al "/api/courses" haywadeeha lel courses router
// localhost /api/courses ==> /   (from the courses router)


app.listen(4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})