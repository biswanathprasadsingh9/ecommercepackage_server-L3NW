const express = require('express');
const router = express.Router();

const SEOController = require('../controllers/SEOController');

router.get('/',SEOController.index);


router.get('/cat_name/:caturl',SEOController.getCategoryNameFromURL);
router.get('/cat_name_subcat_name/:caturl/:caturl',SEOController.getCategorySubcategoryNameFromURL);






module.exports=router;
