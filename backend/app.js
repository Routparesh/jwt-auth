const express = require('express');
const authRoute = require('./authRoute');
const databaseConect = require('./config/databaseConfig');
const cookieParser = require('cookie-parser')

databaseConect()
const app = express();

//middleware
app.use(express.json())

app.use(cookieParser())

app.use('/api/auth/',authRoute)

app.get('/', (req,res)=>{
    res.status(200).json({data: "server updated successfully"})
})

module.exports = app;