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

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'BorrarMedico'
    });
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}