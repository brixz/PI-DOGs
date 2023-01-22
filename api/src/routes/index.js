const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Dogs = require('./dogs');
const Temp = require('./temperaments')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', Dogs)
router.use('/temperaments', Temp)

module.exports = router;
