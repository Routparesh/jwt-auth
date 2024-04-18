const mongoose = require('mongoose');

const MongoDB_URL = process.env.MONGODB_URL


const databaseConect = ()=>{
    mongoose.connect(MongoDB_URL)
    .then((conn)=> console.log('Connected to MongoDB ' + conn.connection.host))
    .catch((err)=> console.log('Error connecting to MongoDB' + err.message))
}

module.exports = databaseConect;
