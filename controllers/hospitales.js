const { response } = require('express');
const Hospital = require('../models/hospital');


/** OBTENER LISTA DE HOSPITALES */
const getHospitales = async (req, res = response) => {

    const hospitales = await  Hospital.find()
                                    .populate('usuario','nombre img');
    

    res.json({
        ok: true,
        hospitales
    });
};


/** CREAR HOSPITAL */
const crearHospital = async(req, res = response) => {

    const hospital = new Hospital( {
        usuario: req.uid,
        ...req.body
        });


    try {

        const hospitalDb = await hospital.save();


        res.json({
            ok: true,
            msg: hospitalDb
        });
       
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Falla al crear Hospital, hable con el administrador ${ error }` 
        })
    }


};


/** ACTUALIZAR HOSPITAL */
const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};


/**  eLIMINAR HOSPITAL */
const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'BorrarHospital'
    });
};



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}