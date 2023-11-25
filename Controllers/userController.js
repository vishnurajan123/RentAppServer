const users=require('../Models/userSchema')


// register
exports.register=async (req,res)=>{
    console.log("Inside Register Controller function");
    const {username,email,password,place,dob}=req.body
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exists !!! Please login...")

        }
        else{
            const newUser=new users({
                username,email,password,place,dob,profile:""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(`Register API Failed , Error: ${err}`)
    }
}