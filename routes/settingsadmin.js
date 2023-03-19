const express = require('express');
const router = express.Router();

const SettingsAdminController = require('../controllers/SettingsAdminController');

router.get('/',SettingsAdminController.index);
router.post('/update',SettingsAdminController.update);


module.exports=router;
