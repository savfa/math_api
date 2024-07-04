const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');


// logs
router.post(`/logs/filter/`, logsController.filter);
router.post(`/logs/`, logsController.create);

module.exports = router;
