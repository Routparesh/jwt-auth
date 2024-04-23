const express = require('express');
const { signup , signin, getUser} = require('./authController');
const jwtAuth = require('./middleware/jwtAuth');

const authRoute = express.Router()

authRoute.post('/signup', signup)
authRoute.post('/signin', signin)
authRoute.get('/user',jwtAuth,getUser)


module.exports = authRoute;