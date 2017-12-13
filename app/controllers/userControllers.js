var Users = require ('../models/users');

function UserHandler() {
  this.getID = function (req, res) {
    if (req.user == undefined) {res.json({user: false})
    } else {
      Users
        .findOne({_id: req.user._id})
        .exec( (err, result) => {
          if (err) { throw err }
          res.json({user: result})
        })
    };
  }
}

module.exports = UserHandler;
