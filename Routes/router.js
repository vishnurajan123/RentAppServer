const express=require('express')
const router=new express.Router()
const userController=require('../Controllers/userController')
const productController=require('../Controllers/productController')
const ratingController=require('../Controllers/ratingController')
const jwtMiddleWare = require('../Middlewares/jwtMiddleWare')
const multerConfig = require('../Middlewares/multerMiddleware')

// register API
router.post('/users/register',userController.register)
// login API
router.post('/users/login',userController.login)
// add product
router.post('/products/add',jwtMiddleWare,multerConfig.single('productImage'),productController.addProducts)
// get user products
router.get('/products/user-products',jwtMiddleWare,productController.allUserProducts)
// get all products
router.get('/products/all-products',productController.getAllProducts)
// edit products
router.put('/products/edit/:id',jwtMiddleWare,multerConfig.single("productImage"),productController.editProducts)
// delete product
router.delete('/products/remove/:id',jwtMiddleWare,productController.deleteProductController)
// add rating
router.post('/ratings/add',jwtMiddleWare,ratingController.addrating)

// export router
module.exports=router