const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

const multer  = require('multer')
const upload = multer({});

router.get('/',ProductController.index);
router.get('/admin_list_view',ProductController.admin_list_view);




router.get('/admin_all_reviews',ProductController.admin_all_reviews);
router.post('/review_store',ProductController.review_store);
router.get('/review_underproducts/:product_id',ProductController.review_underproducts);
router.post('/review_edit',ProductController.review_edit);
router.get('/review_delete/:id',ProductController.review_delete);
router.get('/seen_all_reviews',ProductController.seen_all_reviews);
router.get('/admin_seen_allreviews_under_product/:product_id',ProductController.admin_seen_allreviews_under_product);

router.get('/user_product_reviews/:user_id',ProductController.user_product_reviews);



router.get('/products',ProductController.allproducts);
router.post('/productsearch',ProductController.productsearch);
router.post('/productsearchfinal',ProductController.productsearchfinal);

router.post('/searchproduct',ProductController.searchproduct);


router.post('/searchproduct_byname',ProductController.searchproduct_byname);


router.get('/view_productinfo/:type/:id',ProductController.viewproductinfo);


router.get('/view/:url',ProductController.viewurl);
router.get('/viewweb/:url',ProductController.viewweb);



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


router.post('/update_product_single_value',ProductController.update_product_single_value);

router.post('/update_config_product_image_status',ProductController.updateconfigproductimagestatus);


router.post('/save_sorting_attribute_products',ProductController.savesortingattributeproducts);


router.get('/dummyentry',ProductController.dummyentry);
module.exports=router;
