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
const actualizarHospital = async(req, res = response) => {

    const id    = req.params.id;
    const uid   = req.uid;
    try {

        const hospitalDB = await Hospital.findById( id );
        if(!hospitalDB){
            return res.status(404).json({
                ok:     false,
                msg:    'No existe hospital'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        const mensaje = `Error al guardar hospital: ${ error }`;
        console.log( mensaje );
        res.status(500).json({
            ok: false,
            msg: mensaje
        });
        
    }



};


/**  eLIMINAR HOSPITAL */
const borrarHospital = async(req, res = response) => {
    const id    = req.params.id;
    try {

        const hospitalDB = await Hospital.findById( id );
        if(!hospitalDB){
            return res.status(404).json({
                ok:     false,
                msg:    'Hospital no encontrado por id'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg:    'Hospitale eliminado'
        });
        
    } catch (error) {
        const mensaje = `Error al guardar hospital: ${ error }`;
        console.log( mensaje );
        res.status(500).json({
            ok: false,
            msg: mensaje
        });        
    }
};



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}