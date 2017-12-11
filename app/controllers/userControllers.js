var Users = require ('../models/users');

function UserHandler() {
  this.getID = function (req, res) {
    console.log(req.user)
    if (req.user == undefined) {res.json({user: {_id: null}})
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
