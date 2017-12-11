'use strict';

var Pools = require('../models/pools.js');

function PoolsHandler () {

	this.getPools = function (req, res) {
		Pools
			.find()
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};

	this.getPool = function (req, res) {
		Pools
			.findOne({ '_id': req.params.id})
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result);
				}
			);
	};

	this.votePool = function (req, res) {
		Pools
			.findOneAndUpdate({'_id': req.params.id, 'options': {$elemMatch:{'_id': req.params.voteID}}}, {$inc:{'options.$.votes': 1}} )
			.exec(function (err, result) {
					if (err) { throw err; }
	//				res.redirect('/api/pools/' + req.params.id);
					res.json(result);
				}
			);
	};

	this.getUserPools = function (req, res) {
		Pools
			.find({ 'owner': req.user._id })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
				}
			);
	};

	this.newPool = function(req, res) {
//		console.log(req.user)
		var newPool = new Pools();
		newPool.question = "jskd";
		newPool.owner = req.user ? req.user._id : "5a2e4527c2e25816dccc2338";
		newPool.options = [{option: "12322"}, {option: "124445"}];

		newPool.save(function (err) {
			if (err) {
				throw err;
			}
			res.redirect('/api/user_pools');
		});

	};

}

module.exports = PoolsHandler;
