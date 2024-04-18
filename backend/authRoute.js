const express = require('express');
const { signup } = require('./authController');

const authRoute = express.Router()

authRoute.post('/signup', signup)


module.exports = authRoute;