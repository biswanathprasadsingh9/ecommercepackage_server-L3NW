const express = require('express');
const router = express.Router();

const WebStaticDataController = require('../controllers/WebStaticDataController');


router.get('/flushCache',WebStaticDataController.flushCache);
router.get('/header',WebStaticDataController.header);

module.exports=router;
