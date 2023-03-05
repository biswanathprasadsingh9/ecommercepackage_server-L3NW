const express = require('express');
const router = express.Router();

const BrandController = require('../controllers/BrandController');

const multer  = require('multer')
const upload = multer({});

router.get('/',BrandController.index);
router.post('/store',upload.single('image'),BrandController.store);
router.post('/update',upload.single('image'),BrandController.update);
router.get('/deletefile/:id/:fileid',BrandController.deletefile);
router.get('/updatestatus/:id/:status',BrandController.updatestatus);


module.exports=router;
