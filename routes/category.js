const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/',CategoryController.index);
router.post('/',CategoryController.store);
router.post('/update',CategoryController.update);
router.get('/deletefile/:id',CategoryController.deletefile);
router.get('/updatestatus/:id/:status',CategoryController.updatestatus);





module.exports=router;
