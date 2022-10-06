const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

const multer  = require('multer')
const upload = multer({});

router.get('/',ProductController.index);

router.get('/products',ProductController.allproducts);
router.post('/productsearch',ProductController.productsearch);


router.post('/productsearchfinal',ProductController.productsearchfinal);

router.post('/searchproduct',ProductController.searchproduct);



router.get('/view_productinfo/:type/:id',ProductController.viewproductinfo);



router.get('/showallproductspagination/:page',ProductController.showallproductspagination);
// router.get('/productsearch',ProductController.productsearch);
router.post('/create1',ProductController.create1);
router.post('/create2config',ProductController.create2config);
router.get('/check_product_id/:id',ProductController.checkproductid);
router.get('/configproductlist_both_parent_child/:parent_id',ProductController.configproductparentchildboth);
router.get('/singleproductinformation/:id',ProductController.singleproductinformation);

router.get('/delete_product/:id',ProductController.deleteproduct);
router.post('/productimage_add',upload.single('image'),ProductController.productimageadd);
router.post('/product_single_image_add_config',upload.single('image'),ProductController.productsingleimageaddconfig);


router.post('/add_new_config_attribute',ProductController.addnewconfigattribute);


router.post('/updateimagejson',ProductController.updateimagejson);



router.post('/update_config_product_with_parent',ProductController.updateconfigproductwithparent);
router.post('/update_simple_product',ProductController.updatesimpleproduct);


router.post('/update_config_product_image_status',ProductController.updateconfigproductimagestatus);


router.post('/save_sorting_attribute_products',ProductController.savesortingattributeproducts);



module.exports=router;
