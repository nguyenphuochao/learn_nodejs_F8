const Course = require('../models/Course');

class SiteController {
    // [GET] / site
    async index(req, res) {

        // render json
        try {
            const courses = await Course.find({});
            res.json(courses);
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
        }

        // render view 
        // res.render('home');
    }

    // [GET] / site/:slug
    show(req, res) {
        res.send('News detail');
    }
}

module.exports = new SiteController();