const express = require("express");

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({ success: 'Yes success'});
});

router.get('/test', function(req, res, next) {
  res.send({ success: 'Test success'});
});

module.exports = router;
