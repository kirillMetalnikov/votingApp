'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PoolsHandler = require(path + '/app/controllers/poolsControllers.js');
var UserHandler = require(path + '/app/controllers/userControllers.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var poolsHandler = new PoolsHandler();
	var userHandler = new UserHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/client/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/client/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/client/public/profile.html');
		});

/*	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});
*/
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

/*	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
*/
// My route
	app.route('/api/current_user')
		.get(userHandler.getID)

	app.route('/api/pools')
		.get(poolsHandler.getPools)

	app.route('/api/pools/:id')
		.get(poolsHandler.getPool)

	app.route('/api/pools/:id/:voteID')
		.put(poolsHandler.votePool)

	app.route('/api/user_pools')
		.get(isLoggedIn, poolsHandler.getUserPools)
		.post(isLoggedIn, poolsHandler.newPool)

/*	app.route('/api/user_pools/:id')
		.get(isLoggedIn, poolsHandler.getUserPool)
		.put(isLoggedIn, poolsHandler.updatePool)
		.delete(isLoggedIn, poolsHandler.deletePool) */
};
