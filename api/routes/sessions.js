var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', db.getLastThreeSessions);
router.get('/:sessionid', db.getSessionIfExists);
router.post('/', db.createSession);
router.delete('/:sessionid');

module.exports = router;
