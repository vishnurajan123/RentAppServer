const products=require('../Models/productSchema')

// add product
exports.addProducts=async(req,res)=>{
    console.log("Inside ad products function");
    const userId=req.payload
    const productImage=req.file.filename
    const {title,category,overview,rent,place,contact,loc}=req.body
    try{
        const newProduct=new products({
            title,category,overview,rent,place,contact,loc,productImage,userId
        })
        await newProduct.save()
        res.status(200).json(newProduct)
    }
    catch (err){
        res.status(401).json(newProduct)
    }
}

// getUserProducts-token-required
exports.allUserProducts=async (req,res)=>{
    const userId=req.payload
    try{
        const userProducts=await products.find({userId})
        res.status(200).json(userProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// getAllProducts
exports.getAllProducts=async (req,res)=>{
    try{
        const allProducts=await products.find()
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}