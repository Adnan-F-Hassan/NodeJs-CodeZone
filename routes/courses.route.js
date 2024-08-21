const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses.controller');
const { validationSchema } = require('../middlewares/validationSchema');

//CRUD : CREATE - READ - UPDATE - DELETE

router.route('/')
    //get all courses
    .get(courseController.getAllCourses )
    //CREATE new course
    .post(validationSchema(), courseController.addCourse );

//get single course

/* static: */
/* router.get('/1', (req, res) => {
    const course = courses.find((course) => course.id == 1) //finding from array courses
    res.json(course);
}) */

/* dynamic: */
router.route('/:courseID')
    .get(courseController.getCourse) // get single course
    .patch(courseController.updateCourse) // UPDATE course
    .delete(courseController.deleteCourse) // DELETE course


/* UPDATE course */ 
/*  
    PUT vs PATCH
    PUT: deletes the object and create a new one instead.
    PATCH: modifies the value in the object.
*/ 

module.exports = router;