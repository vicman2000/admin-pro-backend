
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');
const dbPort = process.env.PORT;

// Crea el servidor de express
const app = express();

//Configurar CORS, para restringir desde donde se realiza una consulta de información
app.use( cors() );

// Conecta a la base de datos
dbConnection();


// Rutas
app.get( '/', (req, res)=>{
    res.json({
        ok: true,
        msg: 'Hola Mundo de VicMan'
    })
});


app.listen( dbPort, ()=> {
    console.log(`Servidor corriendo en el puerto ${ dbPort }`);
});

