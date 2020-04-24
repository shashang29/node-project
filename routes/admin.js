const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add-product', (req, res) => {
    res.render('add-product',{pageTitle: 'Add Product', path:'/admin/add-product'})
});

router.post('/add-product', (req, res) => {
    console.log(req.body)
    res.redirect('/');
});

module.exports= router;