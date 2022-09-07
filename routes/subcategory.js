const express = require('express');
const router = express.Router();

const SubCategoryController = require('../controllers/SubCategoryController');

router.get('/',SubCategoryController.index);
router.post('/',SubCategoryController.store);
router.post('/update',SubCategoryController.update);
router.get('/deletefile/:id',SubCategoryController.deletefile);
router.get('/updatestatus/:id/:status',SubCategoryController.updatestatus);





module.exports=router;
