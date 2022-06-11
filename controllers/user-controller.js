const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  // get one user by their id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
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
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found by this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  },

  // delete a user by their id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' })
        return;
      }
      res.json(userData);
    })
    .catch(err => res.json(err));
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        User.findOneAndUpdate(
          { _id: params.friendId },
          { $addToSet: { friends: params.id } },
          { new: true, runValidators: true }
        )
        .then(userData2 => {
          if (!userData2) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(userData);
        })
        .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  },

  // remove friend
  removeFriend({ params }, res){
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      User.findOneAndUpdate(
        { _id: params.friendId },
        { $pull: { friends: params.id } },
        { new: true, runValidators: true }
      )
      .then(userData2 => {
        if (!userData2) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData)
      })
      .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
  }
};

module.exports = userController;