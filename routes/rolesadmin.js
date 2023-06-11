const express = require('express');
const router = express.Router();

const RolesAdminController = require('../controllers/RolesAdminController');

router.get('/',RolesAdminController.index);
router.post('/',RolesAdminController.store);
router.post('/update',RolesAdminController.update);
router.get('/deletefile/:id',RolesAdminController.deletefile);




module.exports=router;
