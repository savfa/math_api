const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');


// logs
router.get(`/logs/filter/`, logsController.filter);
router.post(`/logs/`, logsController.create);

module.exports = router;
