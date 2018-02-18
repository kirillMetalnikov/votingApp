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

	this.deletePoll = function (req, res) {
		console.log(req.params.id)
		Pools
			.findByIdAndRemove({ '_id': req.params.id})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
				}
			);
	};

	this.votePool = function (req, res) {
		var ip = (req.headers["X-Forwarded-For"] ||
      req.headers["x-forwarded-for"] ||
      '').split(',')[0] ||
      req.client.remoteAddress;
		var userID = req.user ? req.user._id.toString() : 'anonymous';

		Pools.findById(req.params.id)
			.exec(function(err, result) {
				if (err) { throw err; }
				if(result.votedIPs.indexOf(ip) != -1) {
					res.json({message: "You have voted from this IP"})
				} else if (userID != 'anonymous' && result.votedUsers.indexOf(userID) != -1)  {
					res.json({message: "You have voted"})
				} else {
					Pools
						.findOneAndUpdate(
							{'_id': req.params.id,'options': {$elemMatch:{'_id': req.params.voteID}}},
						  {$inc: {'options.$.votes': 1}, $push:{'votedIPs': ip, 'votedUsers': userID}},
							{new: true}
						)
						.exec(function (err, result) {
								if (err) { throw err; }
				//				res.redirect('/api/pools/' + req.params.id);
								res.json(result)
								res.end()
							}
						);
				}
			})

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
		var newPool = new Pools();
		var {options, name} = req.body;

		newPool.question = name;
		newPool.owner = req.user && req.user._id;
		newPool.options = options.map( option => {return {option}});

		newPool.save(function (err) {
			if (err) {
				throw err;
			}
			res.redirect('/api/user_pools');
		});

	};

}

module.exports = PoolsHandler;
