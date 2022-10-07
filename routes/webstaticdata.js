const express = require('express');
const router = express.Router();

const WebStaticDataController = require('../controllers/WebStaticDataController');


router.get('/flushCache',WebStaticDataController.flushCache);
router.get('/navitems',WebStaticDataController.navitems);




module.exports=router;
