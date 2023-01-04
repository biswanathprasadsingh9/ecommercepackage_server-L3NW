const express = require('express');
const router = express.Router();

const CountryStateCityController = require('../controllers/CountryStateCityController');

router.get('/',CountryStateCityController.index);

// router.get('/insert_data_country',CountryStateCityController.insert_data_country);
// router.get('/insert_data_state',CountryStateCityController.insert_data_state);
router.get('/insert_data_city',CountryStateCityController.insert_data_city);


router.get('/getcountry',CountryStateCityController.get_country);
router.get('/getstate/:country',CountryStateCityController.get_getstate);
router.get('/getcity/:state',CountryStateCityController.get_getcity);






module.exports=router;
