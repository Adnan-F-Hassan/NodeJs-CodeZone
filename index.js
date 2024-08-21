const express = require('express');

const {body, validationResult } = require('express-validator');
const { title } = require('process');

const app = express();

const courseController = require('./controllers/courses.controller');

app.use(express.json()); // read el body eno type: json 
// app.use(bodyParser.json()); // de gowa el express // read el body eno type: json 



//CRUD : CREATE - READ - UPDATE - DELETE

//get all courses
app.get('/api/courses', courseController.getAllCourses )

//get single course

/* static: */
/* app.get('/api/courses/1', (req, res) => {
    const course = courses.find((course) => course.id == 1) //finding from array courses
    res.json(course);
}) */

/* dynamic: */
app.get('/api/courses/:courseID', courseController.getCourse)


//CREATE new course
app.post('/api/courses/',  [
    body('title')
        .notEmpty()
        .withMessage("title is required")
        .isLength({min: 2})
        .withMessage(" min 2 char in title"),
    body('price')
        .notEmpty()
        .withMessage("price is required")
], courseController.addCourse )


// UPDATE course 
/*  
    PUT vs PATCH
    PUT: deletes the object and create a new one instead.
    PATCH: modifies the value in the object.
*/ 

app.patch('/api/courses/:courseID', courseController.updateCourse )

// DELETE course
app.delete('/api/courses/:courseID', courseController.deleteCourse )


app.listen(4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})