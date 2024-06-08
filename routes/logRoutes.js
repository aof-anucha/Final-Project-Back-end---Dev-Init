// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/', logController.getAllLogs);
router.get('/:id', logController.getLog);
router.post('/', logController.createLog);
router.put('/:id', logController.updateLog);
router.delete('/:id', logController.deleteLog);

module.exports = router;
