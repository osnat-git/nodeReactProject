const express=require('express')
const router= express.Router()
const productController=require('../controllers/productController')
const adminMW=require('../middleware/adminMW')


router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)

// router.use(adminMW)

router.post('/', productController.addProduct)
router.put('/', productController.updateProduct)
router.delete('/', productController.deleteProduct)

module.exports=router