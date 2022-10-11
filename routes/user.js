const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/',UserController.index);
router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.post('/loginadmin',UserController.loginadmin);
router.post('/emailverification',UserController.emailverification);





module.exports=router;
