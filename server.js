const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 2500;

let preguntas = [{id: '0', preg:'¿Las nutrias son mamiferos?', res:true, img:'assets/images/nutria.png', alt: 'nutria'}, 
                 {id: '1', preg:'¿Las pulgas muerden?', res:false, img:'assets/images/pulga.jpg', alt: 'pulga'},
                 {id: '2', preg:'¿Te gusta la salchipapa?', res:true, img:'assets/images/salchipapa.jpg', alt: 'salchipapa'},
                 {id: '3', preg:'¿Los patos superan a un leon en velocidad?', res:false, img:'assets/images/pato.jpg', alt: 'pato'}];


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(express.json());

//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Pantalla principal
app.get('/', (req, res) => {
    res.render('home');
});

//Juego tal cual
app.get('/MacacoPlaying', (req, res) => {
    res.render('game', {"preguntas":preguntas});
});

//Administracion
app.get('/admin', (req, res) => {
    res.render('adminPanel', {"preguntas": preguntas});
});

app.post('/admin', (req, res) => {
    //Reordenamiento de la lista
    preguntas = req.body.newOrder.map((n) => preguntas[n]);
    res.status(200).send('Preguntas reordenadas en: ' + req.body.newOrder);
});

app.delete('/admin/remove/ID-:pregId', (req, res) => {
    //Eliminacion de pregunta
    console.log(req.params);
    preguntas = preguntas.filter((p) => p.id !== req.params.pregId);
    res.status(200).send('Pregunta '+req.params.pregId+' eliminada');
});

//Administracion de nuevas preguntas
app.put('/admin/newQuestion', (req, res) => {
    //preguntas.push(req.body);
    //console.log(preguntas);
    console.log("macaco");
    res.status(200).send('Pregunta añadida ');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

