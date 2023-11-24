const fs = require('fs');
const path = require('path');



const { response } = require("express");
const { v4: uuidv4} = require('uuid')
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const { pathToFileURL } = require('url');


const fileUpLoad = ( req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales','medicos','usuarios']
    if (!tiposValidos.includes(tipo))
    {
        return res.status(400).json({
            ok: false,
            msg:    'No es un tipo valido de (hospitales, medicos, usuarios)'
        })
    }

    // validar qye exista ub archivo
    if(!req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok:     false,
            msg:    'No ha incluido un archivo para guardar'
        })
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // obtenemos el nombre del archivo sin la extensión
    const archivoExtension = nombreCortado[ nombreCortado.length - 1];

    // Validar extensión
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(archivoExtension)){
        return res.status(400).json({
            ok:     false,
            msg:    ` Archivo (${ archivoExtension }) no valido, verifique sea tipo ${ extensionesValidas } `
        })
    }

    // Generar el nombre del archivo especial UUID
    const nombreArchivo = `${ uuidv4() }.${ archivoExtension }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // mover la imagen al repósitorio del servidor
    file.mv( path, err =>{
        if(err){
            console.log( err );
            return res.status(500).json({
                ok:     false,
                msg:    `Error al subir la imagen:: ${ err }`
            });
        }

        //Actualizar imagen en base de datos
        actualizarImagen( tipo, id, nombreArchivo);
        res.json({
            ok:     true,
            msg:    'Archivo cargado',
            archivo: nombreArchivo
        });
    })

};

const retornaImagen = ( req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    const pathNoImage = path.join( __dirname, `../uploads/no-img.jpg`);

    if( fs.existsSync(pathImg) ){
        res.sendFile( pathImg );
    } else {
        res.sendFile( pathNoImage );
    }




}



module.exports = {
    fileUpLoad,
    retornaImagen
}