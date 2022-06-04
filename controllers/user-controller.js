const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  // get one user by their id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },

  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then(userData => res.json(userData))
      .catch(err => res.json(err));
  },

  // update user by their id

  // delete a user by their id
}

module.exports = userController;