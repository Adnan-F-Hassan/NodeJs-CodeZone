const express = require('express');

const app = express();

const courses= [
    {
        id: 1,
        title: "course 1",
        price: 1000
    },
    {
        id: 2,
        title: "course 2",
        price: 2000
    },
    {
        id: 3,
        title: "course 3",
        price: 3000
    }
];

//CRUD : CREATE - READ - UPDATE - DELETE

app.get('/api/courses', (req, res) => {
    res.json(courses); 
    // res.send(); (send) -> sends any type of data 
})

/* static: */
/* app.get('/api/courses/1', (req, res) => {
    const course = courses.find((course) => course.id == 1) //finding from array courses
    res.json(course);
}) */

/* dynamic: */
app.get('/api/courses/:courseID', (req, res) => {
    const courseID = +req.params.courseID; ///ay 7aga btegy mn el url => type: string // "+" type: number
    const course = courses.find((course) => course.id === courseID) //finding from array courses
    if(!course){
        return res.status(404).json({msg: "course not found"});
    }
    res.json(course);
})

app.listen(4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})