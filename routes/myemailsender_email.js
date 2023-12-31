const express = require('express');
const router = express.Router();

const MyEmailSenderEmailController = require('../controllers/MyEmailSenderEmailController');

router.get('/',MyEmailSenderEmailController.index);
router.get('/emailinfo',MyEmailSenderEmailController.emailinfo);
router.post('/sendemail',MyEmailSenderEmailController.sendemail);
router.get('/viewsendemailinfo/:uuid',MyEmailSenderEmailController.viewsendemailinfo);

router.get('/getfiles/:user_id',MyEmailSenderEmailController.getfiles);

router.get('/emailviewed/:email_view_count_code',MyEmailSenderEmailController.emailviewed);

router.get('/viewed_emails_list/:user_id',MyEmailSenderEmailController.viewed_emails_list);




module.exports=router;
