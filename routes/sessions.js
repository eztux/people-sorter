var express = require('express');
var PersonController = require('../controllers/SessionController')

var router = express.Router();

/* GET home page. */
router.get('/', PersonController.all);

router.post('/create', PersonController.create);
router.get('/:name', PersonController.find);
router.get('/:name/people', PersonController.getPeople);

module.exports = router;
