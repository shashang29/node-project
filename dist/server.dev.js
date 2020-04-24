"use strict";

var express = require('express');

var cors = require('cors');

var path = require('path');

var app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express["static"](path.join(__dirname, 'public')));

var adminRoutes = require('./routes/admin');

var shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(4000);