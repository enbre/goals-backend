const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.goals.index);
router.get('/:id', ctrl.goals.show);
router.post('/', ctrl.goals.create);
router.put('/:id', ctrl.goals.update);
router.delete('/:id', ctrl.goals.destroy);

// exports
module.exports = router;