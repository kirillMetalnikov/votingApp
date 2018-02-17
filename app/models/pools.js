'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pool = new Schema({
	question: String,
	owner: String,
  options: [{
      option: String,
			votes: {type: Number, default: 0}
  }],
	votedUsers: [],
	votedIPs: []
});

module.exports = mongoose.model('Pool', Pool);
