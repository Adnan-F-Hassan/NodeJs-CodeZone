let User = require("../models/user.model");
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generateJWT');

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

    // generate JWT token  
    const token = await generateJWT({email: newUser.email, id: newUser._id})
    newUser.token = token

    await newUser.save()
    res.status(201).json({status: httpStatusText.SUCCESS,  data: {course: newUser}})
}) 


const login = asyncWrapper( async (req, res, next) => {
    const {email, password} = req.body;            
    
    if (!email || !password){
        const error = appError.create('email & password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({email:email});
    
    if(!user){
        const error = appErvnror.create('please enter correct email', 404, httpStatusText.ERROR)
        return next(error);
    }
    
    const matchedPassword = await bcrypt.compare(password, user.password)

    if(user && matchedPassword){
        // logged in successfully
        const token = await generateJWT({email: user.email, id: user._id})
        return res.json ({status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create('failed to login', 400, httpStatusText.ERROR)
        return next(error);
    }
})



module.exports = {
    getAllUsers,
    register,
    login
}