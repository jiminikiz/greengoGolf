'use strict'

var Auth = require('./controllers/auth.js');
var Home = require('./controllers/home.js');

module.exports = function(app) {

    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request emdpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration

    // DAHSBOARD
    app.all('/dashboard*', Auth.session); // protect all dashboard routes from unauthorized users
    app.get('/dashboard', (req, res) => { // renders the dashboard, break this out into another controller if needed!
        res.render('dashboard', req.session)
    });

    // Home page
    app.all('/home*', Auth.session);

    app.route('/home')
        .get(Home.get);

    app.route('/home/index')
        .get(Home.partials.index);

    app.route('/home/about')
        .get(Home.partials.about);

    app.route('/home/video')
        .get(Home.partials.video);
}