const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server with Socket.io is running');
});


module.exports = router