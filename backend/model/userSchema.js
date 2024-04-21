const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name must be required'],
        minLength: [5, 'Name must be at least 5 characters'],
        maxLength :[50, 'Name must be at most 50 characters'],
        trim: true,
    },

    email:{
        type: String,
        require:[true, 'Email must be provided'],
        unique:[true, 'Already registered'],
        lowercase: true,
    },
    password:{
        type: String,
    },
    forgetPasswordToken:{
        type: String,
    },
    forgetPasswordTokenDate:{
        type:Date,
    }
})


userSchema.methods= {

    jwtToken(){
        JWT.sign(
            {
                id: this._id,
                email: this.email
            },
            process.env.SCREAT,
            {
                expiresIn: '24h'
            }
        )
    }
    
}



const userModel = mongoose.model('user',userSchema)

module.exports = userModel;