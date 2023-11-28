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
    const searchKey=req.query.search
    const searchLoc=req.query.loc
    const query={
        category:{$regex:searchKey , $options:"i"},
        loc:{$regex:searchLoc , $options:"i"}

    }
    try{
        const allProducts=await products.find(query)
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// update product
exports.editProducts=async (req,res)=>{
    // get edit product details
    const {id}=req.params
    const userId=req.payload
    const { title,category,overview,rent,place,contact,loc,productImage}=req.body
    const uploadProductImage=req.file?req.file.filename:productImage

    try{
        const updateProduct=await products.findByIdAndUpdate({_id:id},{
            title,category,overview,rent,place,contact,loc,productImage:uploadProductImage,userId
        },{new:true})
        await updateProduct.save()
        res.status(200).json(updateProduct)
    }
    catch(err){
        res.status(401).json(err)
    }


}

// delete product
exports.deleteProductController=async (req,res)=>{
    // get product details
    const {id}=req.params
    try{
        const removeProduct=await products.findByIdAndDelete({_id:id})
        res.status(200).json(removeProduct)
    }
    catch (err){
        res.status(401).json(err)
    }
}