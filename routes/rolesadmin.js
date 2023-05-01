const express = require('express');
const router = express.Router();

const RolesAdminController = require('../controllers/RolesAdminController');

router.get('/',RolesAdminController.index);
router.post('/',RolesAdminController.store);
router.post('/update',RolesAdminController.update);



module.exports=router;
