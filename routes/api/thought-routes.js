const router = require('express').Router();
const {
  getAllThought,
  addThought,
  addReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)
;

// /api/thoughts/<userId>
router.route('/:userId').post(addThought)

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
;

module.exports = router;
