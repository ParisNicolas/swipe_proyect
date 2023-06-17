const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const app = express();
const dotenv = require("dotenv");
const port = 2500;

const myRouter = require("./router");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(express.json());

//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Carga de variables de entorno
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// Conexión al cloud de Mongodb Atlas
mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })  
    .then((con) => {
        //console.log(con.connections);
        console.log("Connected to database");
    });




//Rutas
app.use("/", myRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

