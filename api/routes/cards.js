var express = require('express');
var router = express.Router();
const db = require('../db/db');

//router.get('/')
router.get('/:sessionid', db.getCards);
router.post('/', db.addCard);

module.exports = router;