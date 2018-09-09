const router = require('express').Router();
const Todo = require('../controllers/todo');
const {isLogin} = require('../midlewares/isLogin');

router.get('/', Todo.findAll);
router.post('/', isLogin, Todo.create);
router.put('/:id', Todo.submitUpdate);
router.delete('/:id', Todo.removeTodo);

module.exports = router;