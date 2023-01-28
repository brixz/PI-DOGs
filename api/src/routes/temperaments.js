const express = require('express');
const findTemp = require('../Controllers/controller-temp.js');
const router = express.Router();

router.get("/", findTemp);

module.exports = router;