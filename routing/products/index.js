var express = require('express');
var router = express.Router();
var product = require('../../models/product')

var limit = 30;
 router.get('/getProducts', function(req, res) {
     product.find().then((prods) => {
      res.json(prods);
    });
  })
 router.get('/getProductsByID/:productID', function(req, res) {
    product.find({_id:req.params['productID']}).then((prods) => {
     res.json(prods);
   });
 })
 router.get('/getProductsBatch/:indexer', function(req, res) {
  product.find().skip(+req.params['indexer']).limit(limit).then((prods) => {
    res.json(prods);
  })
 })
 router.get('/searchProducts/:productName/:limit', function(req, res) {
  product.find({product:{$regex: req.params['productName']}}).limit(+req.params['limit']).then((prods) => {
    res.json(prods);
  })
 })

  module.exports = router;