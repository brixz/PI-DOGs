const express = require('express');
const {finAllDogName, findDogId, createRaza} = require('../Controllers/controller-dogs.js');

const router = express.Router();

router.get('/', finAllDogName);

router.get('/:id',findDogId);

// router.get("/:id", );

router.post("/", createRaza);

module.exports = router;