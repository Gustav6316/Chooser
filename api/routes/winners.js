var express = require('express');
var router = express.Router();
const db = require('../db/db');

//  Routen für /api/winners
router.get('/:sessionid', db.getWinners);

module.exports = router;
