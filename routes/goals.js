const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/profile', ctrl.goals.index);
router.get('/:id', ctrl.goals.show);
router.post('/profile', ctrl.goals.create);
router.put('/:id', ctrl.goals.update);
router.delete('/:id', ctrl.goals.destroy);

// exports
module.exports = router;