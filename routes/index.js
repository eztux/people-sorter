var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'People Sorter' });
});

router.get('/sort', function(req, res, next) {
  res.render('sort', { title: 'People Sorter' });
});

module.exports = router;
