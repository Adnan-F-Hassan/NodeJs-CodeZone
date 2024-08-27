const { validationSchema } = require('../middlewares/validationSchema');
let Course = require('../models/course.model');
const { validationResult } = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
/////////////// routers handlers :   ///////////////
 // $ operator
const getAllCourses = asyncWrapper(
    async (req, res) => {
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
)


const getCourse  = asyncWrapper(
    async (req, res, next) => { //req.params (get parameters)
        // const courseID = +req.params.courseID; ///ay 7aga btegy mn el url => type: string // "+" type: number
        // const course = courses.find((course) => course.id === courseID) //finding from array courses
        const course = await Course.findById(req.params.courseID)
        if(!course){
            const error = appError.create("course not found", 404, httpStatusText.FAIL )
            return next(error);
        }
        return res.json({status: httpStatusText.SUCCESS,  data: {course}});
    }
)

const addCourse = asyncWrapper (
    async(req, res, next) => {
        // console.log(req.body);
        const errors = validationResult(req);
        // console.log(errors);
        if(!errors.isEmpty()){
            const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
            return next(error);
        }

        const newCourse = new Course (req.body)
        await newCourse.save(),

        res.status(201).json({status: httpStatusText.SUCCESS,  data: {course: newCourse}})
    }
)

const updateCourse = asyncWrapper (
    async (req, res) => { 
        const courseID = req.params.courseID;
        // const updatedCourse = await Course.findByIdAndUpdate(courseID, {$set: {...req.body}})
        const updatedCourse = await Course.updateOne({_id: courseID}, {$set: {...req.body}})
        return res.status(200).json({status: httpStatusText.SUCCESS,  data: {course: updatedCourse}}); 
    }
)

const deleteCourse = asyncWrapper (
    async (req, res) => {
    const courseID = req.params.courseID;
    await Course.deleteOne({_id: courseID});
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
})
 
module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}