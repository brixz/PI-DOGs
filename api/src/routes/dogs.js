const express = require('express');
const findAllDogName = require('../Controllers/controller-dogs.js');
const router = express.Router();

router.get('/',findAllDogName);

// router.get("/:id", );

// router.get("/:id", );

// router.post("/", );

module.exports = router;