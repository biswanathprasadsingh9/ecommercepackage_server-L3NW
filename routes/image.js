const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/ImageController');

const multer  = require('multer')
const upload = multer({});

router.get('/',ImageController.index);
router.post('/',upload.single('image'),ImageController.store);
router.post('/uploadwithoutsave',upload.single('image'),ImageController.uploadwithoutsave);


router.get('/:fileId/:id',ImageController.remove);

router.get('/deletenow/deleteFile/:id',ImageController.deleteFile);



module.exports=router;
