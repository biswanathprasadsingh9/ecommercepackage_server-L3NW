const express = require('express');
const router = express.Router();

const ChildCategoryController = require('../controllers/ChildCategoryController');

router.get('/',ChildCategoryController.index);
router.post('/',ChildCategoryController.store);
router.post('/update',ChildCategoryController.update);
router.get('/deletefile/:id',ChildCategoryController.deletefile);
router.get('/updatestatus/:id/:status',ChildCategoryController.updatestatus);





module.exports=router;
