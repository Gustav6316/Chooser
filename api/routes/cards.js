var express = require('express');
var router = express.Router();
const db = require('../db/db');

// /test wird noch ersetzt
router.post('/', db.addCardDeck);

module.exports = router;