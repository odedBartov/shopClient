var mongoose = require('mongoose')

var productModelSchema = new mongoose.Schema({
    imageUrl: String,
    _id: Number,
    product: String,
    price: String,
    inStock: Boolean
  })
  var productModel = mongoose.model('product', productModelSchema)
module.exports = productModel