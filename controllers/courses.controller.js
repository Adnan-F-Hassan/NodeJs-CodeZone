
let Course = require('../models/course.model');

const { validationResult } = require('express-validator');

/////////////// routers handlers :   ///////////////
 
const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses); 
    // res.send(); (send) -> sends any type of data 
}


const getCourse  = async (req, res) => { //req.params (get parameters)
    // const courseID = +req.params.courseID; ///ay 7aga btegy mn el url => type: string // "+" type: number
    // const course = courses.find((course) => course.id === courseID) //finding from array courses
    try {
        const course = await Course.findById(req.params.courseID)
        if(!course){
            return res.status(404).json({msg: "course not found"});
        }
        return res.json(course);
    } catch (err) {
        return res.status(400).json({msg: "invaled object ID"});
    }
}


const addCourse = async (req, res) => {
// console.log(req.body);
const errors = validationResult(req);
// console.log(errors);
if(!errors.isEmpty()){
    return res.status(400).json(errors.array());
}

const newCourse = new Course (req.body)
await newCourse.save(),

res.status(201).json(newCourse)
}


const updateCourse = async (req, res) => { 
    const courseID = req.params.courseID;
    try {
        // const updatedCourse = await Course.findByIdAndUpdate(courseID, {$set: {...req.body}})
        const updatedCourse = await Course.updateOne({_id: courseID}, {$set: {...req.body}})
        return res.status(200).json(updatedCourse); 
    } catch (err) { 
        return res.status(400).json({error: err});   
    }
}


const deleteCourse = async (req, res) => {
    const courseID = req.params.courseID;
    const deleteCourse = await Course.deleteOne({_id: courseID});
    res.status(200).json({success: true, msg: deleteCourse});
}
 
module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}