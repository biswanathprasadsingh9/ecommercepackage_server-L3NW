const express = require('express');
const router = express.Router();

const WebStaticDataController = require('../controllers/WebStaticDataController');


router.get('/flushCache',WebStaticDataController.flushCache);
router.get('/navitems',WebStaticDataController.navitems);

router.get('/viewproduct/:url',WebStaticDataController.viewproduct);

router.get('/testpdf',WebStaticDataController.testpdf);


router.get('/homepage',WebStaticDataController.homepage)



module.exports=router;
