var express = require('express');
var router = express.Router();
const db = require('../db/db');

// /test wird noch ersetzt
router.get('/', db.getLastThreeSessions);
router.post('/', db.createSession);

module.exports = router;