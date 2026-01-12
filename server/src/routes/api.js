const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/projects', controller.getProjects);

module.exports = router;