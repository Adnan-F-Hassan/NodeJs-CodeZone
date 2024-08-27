const express = require('express');

const router = express.Router();

// uploading files using multer
const multer  = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})
 
const fileFilter = (req, file, cb) => { //cb = Call Back
    const imageType = file.mimetype.split('/')[0];

    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
})


const usersController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const appError = require('../utils/appError');

// get all users 
router.route('/')
    .get(verifyToken, usersController.getAllUsers);

// register
router.route('/register')
    // .post(usersController.register);
    .post(upload.single('avatar'), usersController.register)

// login
router.route('/login')
    .post(usersController.login);

module.exports = router;