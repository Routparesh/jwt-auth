const userModel = require("./model/userSchema");
const emailValidator = require("email-validator");

const signup = async(req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message:'Every field is required!'
        })
    }

    const validEmail = emailValidator.validate(email)

    if(!validEmail){
        return res.status(400).json({
            success: false,
            message:'Please Provide valid email address'
        })
    }
    
    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message:'password & confirm password do not match'
        })
    }

    try {
        const userInfo =  userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {

        if(error.code === 11000){
            return res.status(400).json({
                success:false,
                message: 'Email already exists in the database'
             })
        }
        return res.status(400).json({
            success:false,
            message: error.message
         })
       
    }
   
 };
 
 module.exports = {
     signup
 };
 