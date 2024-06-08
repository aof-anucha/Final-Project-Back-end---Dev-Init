const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.get('/:id', todoController.getTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
