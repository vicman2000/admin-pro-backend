const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                            .populate('usuario','nombre')
                            .populate('hospital','nombre');

    res.json({
        ok: true,
        msg: medicos
    });
};


const crearMedico = async (req, res = response) => {

    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    })

    try {

        const medicoDb = await medico.save();

        res.json({
            ok: true,
            msg: medicoDb
        });
       
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Falla al guardar médico :: ${error}`
        });        
    }



};

const actualizarMedico = async(req, res = response) => {

    const id    = req.params.id; // identificador del registro a modificar
    const uid   = req.uid; // Obtenemos el User Id del Token previamente validaddo

    try {
        const medicoDB = await Medico.findById( id );
        if(!medicoDB){
            return res.status(404).json({
                ok:     false,
                msg:    'No existe medico'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        const mensaje = `Error al guardar medico: ${ error }`;
        console.log( mensaje );
        res.status(500).json({
            ok: false,
            msg: mensaje
        });
        
    }
};

const borrarMedico = async(req, res = response) => {
    const id    = req.params.id;
    try {

        const medicoDB = await Medico.findById( id );
        if(!medicoDB){
            return res.status(404).json({
                ok:     false,
                msg:    'Hospital no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg:    'Medico eliminado'
        });
        
    } catch (error) {
        const mensaje = `Error al eliminar medico: ${ error }`;
        console.log( mensaje );
        res.status(500).json({
            ok: false,
            msg: mensaje
        });
        
    }
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}