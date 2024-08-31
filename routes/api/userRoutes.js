const router = require('express').Router();

const { // Functions to import from userController
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

// Rooute for /api/users route, get all users and create a user
router.route('/').get(getUsers).post(createUser);

// Route for /api/users/:userId, get a single user, update a user and delete a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Route for /api/users/:userId/friends, add a friend and delete a friend
router.route('/:userId/friends').post(addFriend).delete(deleteFriend);

module.exports = router;