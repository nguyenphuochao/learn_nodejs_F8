const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class SiteController {
    // [GET] / site
    index(req, res, next) {

        // render view -> res.render('home', { courses }) 
        // render json -> res.json(courses)
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
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