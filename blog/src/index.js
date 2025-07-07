const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;

// HTTP logger
app.use(morgan('combined'));

// template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// router
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
    res.render('news')
})


// start project [node index.js]
// start project with nodemon [npm start]
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})