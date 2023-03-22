const express = require('express');
const router = express.Router();

const SettingsAdminController = require('../controllers/SettingsAdminController');

router.get('/',SettingsAdminController.index);
router.post('/update',SettingsAdminController.update);
router.get('/anduser/:user_id',SettingsAdminController.with_user_details);

router.get('/logoutadminfromalldevices',SettingsAdminController.logout_admin_from_all_devices);
router.get('/logoutmyaccountfromalldevices/:user_id',SettingsAdminController.logout_myaccount_from_alldevices);




module.exports=router;
