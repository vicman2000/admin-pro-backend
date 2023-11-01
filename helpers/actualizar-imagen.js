
const fs = require('fs');

const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const actualizarImagen = async(tipo, id, nombreArchivo) =>{
    let data = [];
    switch ( tipo ) {
        case 'medicos':
            data = await Medico.findById(id);
            break;
        case 'hospitales':
            data = await Hospital.findById(id);
            break;
        case 'usuarios':
            data = await Usuario.findById(id);
            break;            
    }


    if(!data){
        console.log(`Registro con id ${ id } no existe en ${ tipo }`);
        return false;
    }
    
    const pathViejo = `./uploads/${ tipo }/${ data.img }` ;

    if( fs.existsSync(pathViejo)){
        // Borra la imagen anterior
        fs.unlinkSync( pathViejo );
    }

    data.img = nombreArchivo;
    data.save();
    return true;

}




module.exports   = {
    actualizarImagen
}
