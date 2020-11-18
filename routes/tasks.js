const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.tasks.index);
router.get('/:id', ctrl.tasks.show);
router.post('/', ctrl.tasks.create);
router.put('/:id', ctrl.tasks.update);
router.delete('/:id', ctrl.tasks.destroy);

// exports
module.exports = router;