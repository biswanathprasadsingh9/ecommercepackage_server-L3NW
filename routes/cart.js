const express = require('express');
const router = express.Router();

const CartController = require('../controllers/CartController');

router.post('/store',CartController.store);
router.get('/getcartitems/:user_id/:system_id',CartController.getcartitems);
router.get('/getcartitemsnologin/:system_id',CartController.getcartitemsnologin);
router.get('/remove/:id',CartController.remove);
router.post('/addcheckcart',CartController.addcheckcart);
router.post('/addtocart2',CartController.addtocart2);

router.post('/gen_cart_item_local',CartController.gencartitemlocal);


router.get('/admin_setseen_cart/:id',CartController.admin_setseen_cart);
router.get('/admin_setseen_all_userscart/:user_id',CartController.admin_setseen_all_userscart);



module.exports=router;
