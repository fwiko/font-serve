const express = require('express');
const path = require('path');
const cors = require('cors');

const port = 3099;

const app = express();
app.use(cors());

const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    var ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
    console.log(`> ${ip} | ${req.path} | ${req.method}`);
    next();
});

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use('/', require('./routing/get'));

app.listen(port, () => {
    console.log(`server started on port ${port}...`);
});