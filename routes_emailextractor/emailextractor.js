const express = require('express');
const router = express.Router();

const EmailExtractorController = require('../controllers_emailextractor/EmailExtractorController');

router.get('/',EmailExtractorController.index);

module.exports=router;
