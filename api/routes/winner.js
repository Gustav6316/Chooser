var express = require('express');
var router = express.Router();
const db = require('../db/db');

//  Routen für /api/winner
router.get('/:sessionid', db.getWinner);

module.exports = router;
