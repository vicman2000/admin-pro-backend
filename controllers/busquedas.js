/**
 * Usuarios Controller
 */
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


/**RUTAS */
const getTodo = async( req, res = response ) => {
    const busqueda = req.params.busqueda;
    /**Aplicamos expresión regular */
    const regex = new RegExp( busqueda, 'i'); // Con la 'i', omitimos caseSensitive
    const [usuarios, medicos, hospitales] = await Promise.all([
            await Usuario.find({ nombre: regex }), // utilizamos la expresión regular
            await Medico.find({ nombre: regex }), // utilizamos la expresión regular
            await Hospital.find({ nombre: regex }) // utilizamos la expresión regular
    ])

    res.json({
        ok: true,
        msg: 'getTodo',
        usuarios,
        medicos,
        hospitales
    });

}

const getDocumentosColeccion = async( req, res = response ) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda || '';    
    const regex = new RegExp(busqueda, 'i'); // Aplico regex, para busquedas generales quitando case sensitive con la 'i'

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario' ,'nombre img')
                                .populate('hospital','nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario' ,'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });                                
            break;            
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser medicos/hospitales/usuarios'
            })
            break;
    }

    res.json({
        ok: true,
        resultado: data
    });

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}
