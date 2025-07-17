const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');

// connect DB
db.connect();

// lấy img trong public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
})); // support POST Form
app.use(express.json()); // support JSON : ajax, fetch, axios, XMLHttpRequest

// HTTP method override
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Custom middleware
app.use(SortMiddleware);

// template engine
app.engine('.hbs', engine({
    extname: '.hbs', helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'bi bi-arrow-down-up',
                asc: 'bi bi-arrow-up',
                desc: 'bi bi-arrow-down'
            };

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            };

            const icon = icons[sortType]
            const type = types[sortType]

            return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// start project [node index.js]
// start project with nodemon [npm start]
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})