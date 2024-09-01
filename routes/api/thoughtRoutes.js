const router = require('express').Router();

const { // Functions to import from thoughtController
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// Rooute for /api/thoughts route, get all thoughts and create a thought
router.route('/').get(getThoughts).post(createThought);

// Route for /api/thoughts/:thoughtId, get a single thought, update a thought and delete a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Route for /api/thoughts/:thoughtId/reactions, add a reaction
router.route('/:thoughtId/reactions').post(addReaction);

// Route for /api/thoughts/:thoughtId/reactions/:reactionId, delete a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;