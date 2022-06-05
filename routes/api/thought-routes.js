const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  addReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)
;

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
;

// /api/thoughts/<userId>
router.route('/:userId').post(addThought)

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
;

module.exports = router;
