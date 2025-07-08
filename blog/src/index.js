const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const app = express();
const port = 3000;

// lấy img trong public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
})); // support POST Form
app.use(express.json()); // support JSON : ajax, fetch, axios, XMLHttpRequest

// HTTP logger
app.use(morgan('combined'));

// template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

// start project [node index.js]
// start project with nodemon [npm start]
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})