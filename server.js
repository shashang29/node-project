const express = require('express');
const cors = require('cors');
const path = require('path');

const {get404} = require('./controllers/error');

const app = express();

app.set('view engine','pug');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(4000);
