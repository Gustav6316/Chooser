var express = require('express');
var router = express.Router();
const db = require('../db/db');

//  Routen für /api/sessions
router.get('/', db.getLastThreeSessions);
router.post('/', db.createSession);
router.delete('/:sessionid');

module.exports = router;
