const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users.controller');

// get all users 
router.route('/')
    .get(usersController.getAllUsers);

// register
router.route('/register')
    .post(usersController.register);

// login
router.route('/login')
    .post(usersController.login);

module.exports = router;