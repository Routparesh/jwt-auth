const express = require('express');
const authRoute = require('./authRoute');
const databaseConect = require('./config/databaseConfig');

databaseConect()
const app = express();

//middleware
app.use(express.json())

app.use('/api/auth/',authRoute)

app.get('/', (req,res)=>{
    res.status(200).json({data: "server updated successfully"})
})

module.exports = app;