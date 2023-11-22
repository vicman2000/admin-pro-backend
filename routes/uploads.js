/**
 * Ruta: /api/uploads
 */
const { Router } = require('express');
const expressFileUpLoad = require('express-fileupload')


const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpLoad, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpLoad() );

router.put( '/:tipo/:id', validarJWT, fileUpLoad);

router.get( '/:tipo/:foto', retornaImagen);

module.exports = router;