const express = require('express');

const {body, validationResult } = require('express-validator');
const { title } = require('process');

const app = express();



app.use(express.json()); // read el body eno type: json 
// app.use(bodyParser.json()); // de gowa el express // read el body eno type: json 

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

//get all courses
app.get('/api/courses', (req, res) => {
    res.json(courses); 
    // res.send(); (send) -> sends any type of data 
})

//get single course

/* static: */
/* app.get('/api/courses/1', (req, res) => {
    const course = courses.find((course) => course.id == 1) //finding from array courses
    res.json(course);
}) */

/* dynamic: */
app.get('/api/courses/:courseID', (req, res) => { //req.params (get parameters)
    const courseID = +req.params.courseID; ///ay 7aga btegy mn el url => type: string // "+" type: number
    const course = courses.find((course) => course.id === courseID) //finding from array courses
    if(!course){
        return res.status(404).json({msg: "course not found"});
    }
    res.json(course);
})


//CREATE new course

app.post('/api/courses/', 
    [
        body('title')
            .notEmpty()
            .withMessage("title is required")
            .isLength({min: 2})
            .withMessage(" min 2 char in title"),
        body('price')
            .notEmpty()
            .withMessage("price is required")
    ], (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    // console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

        //validations 
    /* if(!req.body.title){
        return res.status(400).json({error: ' title not provided '})
    }
    if(!req.body.price){
        return res.status(400).json({error: ' price not provided '})
    } */

    const course = ({id: courses.length +1, ...req.body});
    courses.push(course);

    /* return all courses + added one */
    // courses.push({id: courses.length +1, ...req.body});

    res.status(201).json(course)
})


// UPDATE course 
/*  
    PUT vs PATCH
    PUT: deletes the object and create a new one instead.
    PATCH: modifies the value in the object.
*/ 

app.patch('/api/courses/:courseID', (req, res) => { 
    const courseID = +req.params.courseID;
    let course = courses.find((course) => course.id === courseID) 
    if(!course){
        return res.status(404).json({msg: "course not found"})
    }
    
    course = {...course, ...req.body};
    res.status(200).json(course)
     

})




app.listen(4000, () =>{
    console.log( "hello, welcome, listening on port: 4000 ");  
})