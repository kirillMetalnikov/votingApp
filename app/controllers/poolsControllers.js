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
		Pools
			.findOneAndUpdate({'_id': req.params.id, 'options': {$elemMatch:{'_id': req.params.voteID}}}, {$inc:{'options.$.votes': 1}}, {new: true} )
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
		var newPool = new Pools();
		var {options, name} = req.body;

		newPool.question = name;
		newPool.owner = req.user ? req.user._id : "5a2e4527c2e25816dccc2338";
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
