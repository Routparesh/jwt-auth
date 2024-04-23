
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

 const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is mandatory'
        });
    }

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user || user.password !== password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        // Generate JWT token
        const token = user.jwtToken()

        // Remove password from user object
        user.password = undefined;

        // Set cookie with token
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true
        };
        res.cookie('token', token, cookieOption);

        // Send response
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


const getUser = async(req,res,next) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }


}

 
 module.exports = {
     signup, signin, getUser
 };
 