const ratings=require('../Models/ratingSchema')

// add ratings
exports.addrating=async(req,res)=>{
    console.log("Inside add ratings function");
    const userId=req.payload
    const {productId,rating,review}=req.body
    try{
        const newRating=new ratings({
            productId,rating,review,userId
        })
        await newRating.save()
        res.status(200).json(newRating)
    }
    catch(err){
        res.status(401).json(newRating)
    }
}