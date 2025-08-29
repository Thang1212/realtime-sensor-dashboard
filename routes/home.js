const express = require('express')
const router = express.Router();

const homeController = require('../controllers/HomeController')

// router.use('/:slug', homeController.show);
router.get('/', homeController.index);

module.exports = router
