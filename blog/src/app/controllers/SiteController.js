const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class SiteController {
    // [GET] / site
    index(req, res, next) {
        
        const search = req.query.search ? String(req.query.search) : '';

        // render view -> res.render('home', { courses }) 
        // render json -> res.json(courses)
        Course.find({ name: { $regex: search, $options: 'i' } })
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    search: search
                });
            })
            .catch(next)
    }

    // [GET] / site/:slug
    show(req, res, next) {
        Course.findOne({ id: 1 })
            .then(course => {
                res.render('show', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next)
    }
}

module.exports = new SiteController();