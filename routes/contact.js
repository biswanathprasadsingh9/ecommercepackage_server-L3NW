const express = require('express');
const router = express.Router();

const ContactController = require('../controllers/ContactController');

router.get('/',ContactController.index);
router.post('/',ContactController.store);
router.post('/update',ContactController.update);
router.get('/deletefile/:id',ContactController.deletefile);




module.exports=router;
