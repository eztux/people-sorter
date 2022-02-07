var express = require('express');
var PersonController = require('../controllers/PersonController')

var router = express.Router();

/* GET home page. */
router.get('/', PersonController.all);

router.post('/create', PersonController.create);
router.get('/:name', PersonController.find);
router.get('/:name/session', PersonController.getSession);

module.exports = router;
