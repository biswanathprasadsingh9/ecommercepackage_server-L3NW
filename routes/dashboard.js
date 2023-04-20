const express = require('express');
const router = express.Router();

const DashboardController = require('../controllers/DashboardController');

router.get('/',DashboardController.index);

router.get('/cacheflush',DashboardController.cacheflush);


router.get('/dynamicdatas',DashboardController.dynamicdatas);
router.get('/admin_dashboard',DashboardController.admin_dashboard);


module.exports=router;
