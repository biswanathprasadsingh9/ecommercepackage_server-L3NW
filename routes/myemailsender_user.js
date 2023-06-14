const express = require('express');
const router = express.Router();

const MyEmailSenderUserController = require('../controllers/MyEmailSenderUserController');

router.get('/',MyEmailSenderUserController.index);
router.get('/create',MyEmailSenderUserController.create);
router.post('/login',MyEmailSenderUserController.login);






module.exports=router;
