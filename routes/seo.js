const express = require('express');
const router = express.Router();

const SEOController = require('../controllers/SEOController');

router.get('/',SEOController.index);

router.get('/cacheflush',SEOController.cacheflush);

router.get('/cat_name/:caturl',SEOController.getCategoryNameFromURL);
router.get('/cat_name_subcat_name/:caturl/:subcaturl',SEOController.getCategorySubcategoryNameFromURL);
router.get('/cat_name_subcat_name_childcat_name/:caturl/:subcaturl/:childcaturl',SEOController.getCategorySubcategoryChildcategoryNameFromURL);

router.get('/brand_name/:name',SEOController.getBrandNameFromURL);






module.exports=router;
