var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', db.getUsers);

router.get('/:id', db.getUsersByID);

router.post('/', db.createUser);

module.exports = router;

