const express=require('express')
const router=express.Router()
const { getBasket,addToBasket,updateQuantity,deleteBasket }
=require('../controllers/basketController')
const registerdMW=require('../middleware/registeredUserMW')

router.use(registerdMW)

router.get('/',getBasket)
router.post('/',addToBasket)
router.put('/',updateQuantity)
router.delete('/',deleteBasket)

module.exports= router