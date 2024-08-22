
let Course = require('../models/course.model');

const { validationResult } = require('express-validator');

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');

/////////////// routers handlers :   ///////////////
 // $ operator
const getAllCourses = async (req, res) => {
    // url : (/...?limit=2&page=1
    const query = req.query // get object query from url {limit: 2, page: 1}
    const limit = query.limit || 10;  // get limit from query if no limits set default = 10;  
    const page = query.page || 1; // get page from query if no page , set default = 1;
    const skip = (page - 1) * limit;
    // find takes filter - prejection - options
    // await Course.find({filter}, {projection}, {options});
    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip);
    // const courses = await Course.find(); // return all 
    // const courses = await Course.find({}); // return all 
    res.json({status: httpStatusText.SUCCESS,  data: {courses}}); 
    // res.send(); (send) -> sends any type of data 
}


const getCourse  = asyncWrapper(
    async (req, res) => { //req.params (get parameters)
        // const courseID = +req.params.courseID; ///ay 7aga btegy mn el url => type: string // "+" type: number
        // const course = courses.find((course) => course.id === courseID) //finding from array courses
        const course = await Course.findById(req.params.courseID)
        if(!course){
            return res.status(404).json({status: httpStatusText.FAIL,  data: {course: "course not found"}});
        }
        return res.json({status: httpStatusText.SUCCESS,  data: {course}});
        // try {
        // } catch (err) {
        //     return res.status(400).json({status: httpStatusText.ERROR,  data: null, message: err.message, code: 400});
        // }
    }
)

const addCourse = async (req, res) => {
// console.log(req.body);
const errors = validationResult(req);
// console.log(errors);
if(!errors.isEmpty()){
    return res.status(400).json({status: httpStatusText.FAIL,  data: errors.array()});
}

const newCourse = new Course (req.body)
await newCourse.save(),

res.status(201).json({status: httpStatusText.SUCCESS,  data: {course: newCourse}})
}


const updateCourse = async (req, res) => { 
    const courseID = req.params.courseID;
    try {
        // const updatedCourse = await Course.findByIdAndUpdate(courseID, {$set: {...req.body}})
        const updatedCourse = await Course.updateOne({_id: courseID}, {$set: {...req.body}})
        return res.status(200).json({status: httpStatusText.SUCCESS,  data: {course: updatedCourse}}); 
    } catch (err) { 
        return res.status(400).json({status: httpStatusText.ERROR, message: err.message});   
    }
}


const deleteCourse = async (req, res) => {
    const courseID = req.params.courseID;
    await Course.deleteOne({_id: courseID});
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
}
 
module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}