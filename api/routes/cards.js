var express = require('express');
var router = express.Router();
const db = require('../db/db');

//  Routen für /api/cards
router.get('/:sessionid', db.getCards);

router.post('/', db.addCard);
router.patch('/', db.updateScore);

module.exports = router;
