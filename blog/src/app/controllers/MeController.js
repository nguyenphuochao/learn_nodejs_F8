const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class MeController {
    // [GET] / me/stored/courses
    storedCourses(req, res, next) {
        // Dùng Promise.all để truy vấn 2 collection trong 1 lần
        Promise.all([Course.find({}), Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController();