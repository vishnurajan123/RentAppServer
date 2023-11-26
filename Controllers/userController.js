const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')

// register
exports.register=async (req,res)=>{
    console.log("Inside Register Controller function");
    const {username,email,password,place,phone}=req.body
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exists !!! Please login...")

        }
        else{
            const newUser=new users({
                username,email,password,place,phone,profile:""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(`Register API Failed , Error: ${err}`)
    }
}

// login
exports.login=async (req,res)=>{
    console.log("Inside login Controller function...");

    const {email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"supersecretkey12345")
            res.status(200).json({
                existingUser,token
            })
        }
        else{
            res.status(404).json("Invalid email or password")
        }
    }
    catch(err){
        res.status(401).json(`Login API Failed , Error: ${err}`)
    }
}