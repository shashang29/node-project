const express = require('express');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)
});

app.listen(4000);
