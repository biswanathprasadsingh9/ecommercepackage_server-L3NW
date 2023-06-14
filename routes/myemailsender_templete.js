
const express = require('express');
const router = express.Router();

const MyEmailSenderTempleteController = require('../controllers/MyEmailSenderTempleteController');

router.get('/',MyEmailSenderTempleteController.index);
router.get('/getfiles/:user_id',MyEmailSenderTempleteController.getfiles);

router.post('/',MyEmailSenderTempleteController.store);
router.post('/update',MyEmailSenderTempleteController.update);
router.get('/delete/:id',MyEmailSenderTempleteController.deleteid);
router.get('/view/:id',MyEmailSenderTempleteController.view);
router.get('/getbyname/:name',MyEmailSenderTempleteController.getbyname);




module.exports=router;
