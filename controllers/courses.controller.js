
let { courses } = require('../data/courses');

const { validationResult } = require('express-validator');


//////////////////////////// routers handlers :
 
const getAllCourses = (req, res) => {
    res.json(courses); 
    // res.send(); (send) -> sends any type of data 
}


const getCourse  = (req, res) => { //req.params (get parameters)
    const courseID = +req.params.courseID; ///ay 7aga btegy mn el url => type: string // "+" type: number
    const course = courses.find((course) => course.id === courseID) //finding from array courses
    if(!course){
        return res.status(404).json({msg: "course not found"});
    }
    res.json(course);
}


const addCourse = (req, res) => {
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

const course = {id: courses.length +1, ...req.body};
courses.push(course);

/* return all courses + added one */
// courses.push({id: courses.length +1, ...req.body});

res.status(201).json(course)
}


const updateCourse = (req, res) => { 
    const courseID = +req.params.courseID;
    let course = courses.find((course) => course.id === courseID) 
    if(!course){
        return res.status(404).json({msg: "course not found"})
    }
    
    course = {...course, ...req.body};
    res.status(200).json(course);
}


const deleteCourse = (req, res) => {
    const courseID = +req.params.courseID;
    courses = courses.filter((course) => course.id !== courseID);
    
    res.status(200).json({success: true});
}

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}