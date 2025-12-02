const Basket = require('../models/Basket')
const Product = require('../models/Product')

const getBasket = async (req, res) => {
    const basket = await Basket.find({ userId: req.user._id }).populate('productId').lean()
    res.json(basket)
}
const addToBasket = async (req, res) => {
    const { productId } = req.body
    if (!productId)
        return res.status(400).send("מס מוצר הוא חובה")
    const product = await Product.findById(productId)
    if (!product)
        return res.status(409).send("מוצר לא קיים")
    const basket = await Basket.create({ userId: req.user._id, productId })
    res.json(basket)
}
const updateQuantity = async (req, res) => {
    const { _id, quantity } = req.body
    if (!_id || !quantity)
        return res.status(400).send("מס סל וכמות הם חובה")
    const basket = await Basket.findById(_id)
    if (!basket)
        return res.status(400).send("הסל לא קיים")
    basket.quantity = quantity
    const b = await basket.save()
    res.json(b)
}
const deleteBasket = async (req, res) => {
    const { _id } = req.body
    // console.log(_id);
    // console.log(req.body);
    if (!_id)
        return res.status(400).send("מס סל הוא חובה")

    const basket = await Basket.findById(_id)
    if (!basket)
        return res.status(400).send("הסל לא קיים")
    await basket.deleteOne()
    res.json("נמחק")
}

module.exports = { getBasket, addToBasket, updateQuantity, deleteBasket }