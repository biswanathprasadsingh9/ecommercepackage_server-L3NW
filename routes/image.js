const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/ImageController');

const multer  = require('multer')
const upload = multer({});

router.get('/',ImageController.index);
router.post('/',upload.single('image'),ImageController.store);
router.patch('/:fileId/:id',ImageController.remove);

module.exports=router;
