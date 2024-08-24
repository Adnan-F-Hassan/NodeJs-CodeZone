let User = require("../models/user.model");
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt');

const getAllUsers = asyncWrapper( async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10; 
    const page = query.page || 1;
    const skip = (page - 1 ) * limit;

    const users = await User.find({}, {'__v': false, 'password': false}).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: {users}});
}) 


const register = asyncWrapper( async(req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await User.findOne({ email : email});
    if (oldUser){
        const error = appError.create('User already exists', 400, httpStatusText.FAIL)
        return next(error);
    }

    /* Hashing the password */
    const hashedPassword = await bcrypt.hash(password, 10 )

    const newUser = new User({
        firstName, 
        lastName,
        email,
        password: hashedPassword
    })

    await newUser.save()
    res.status(201).json({status: httpStatusText.SUCCESS,  data: {course: newUser}})
}) 


const login = () => {            

}



module.exports = {
    getAllUsers,
    register,
    login
}