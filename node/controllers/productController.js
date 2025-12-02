const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    res.json(products)
}
const getProductById = async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id).lean()
    if(!product)
        return res.status(400).send("המוצר לא קיים")
    res.json(product)
}
const addProduct = async (req, res) => {
    const { name, price, quantity ,image} = req.body
    if (!name || !price || !quantity)
        return res.status(400).send("שם, מחיר וכמות הם חובה")
    
    const product = await image?Product.create({ name, price, quantity,image }):Product.create({ name, price, quantity})
    res.json(product)
}
const updateProduct = async (req, res) => {
    const { _id, name, price, quantity,image } = req.body
    if (!_id || !name || !price || !quantity)
        return res.status(400).send("מס מוצר, שם, מחיר וכמות הם חובה")
    const product = await Product.findById(_id)
    if (!product)
        return res.status(400).send("המוצר לא קיים")
    // console.log(product);
    product.name = name
    product.price = price
    product.quantity = quantity
    product.image = image
    const p = await product.save()
    res.json(p)
}
const deleteProduct = async (req, res) => {
    const { _id } = req.body
    if (!_id)
        return res.status(400).send("מס מוצר הוא חובה")
    const product = await Product.findById(_id)
    if (!product)
        return res.status(400).send("המוצר לא קיים")
    await product.deleteOne()
    res.send("נמחק")
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }