const express = require('express');
const multer = require("multer"); //Para formularios multipart
const path = require('path');
const router = express.Router();

//router.route('/').get(myController.inicio);

//Carga de imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname));
    }
});
const upload = multer({ storage: storage });



let preguntas = [{id: '0', preg:'¿Las nutrias son mamiferos?', res:true, img:'assets/images/nutria.png', alt: 'nutria'}, 
                 {id: '1', preg:'¿Las pulgas muerden?', res:false, img:'assets/images/pulga.jpg', alt: 'pulga'},
                 {id: '2', preg:'¿Te gusta la salchipapa?', res:true, img:'assets/images/salchipapa.jpg', alt: 'salchipapa'},
                 {id: '3', preg:'¿Los patos superan a un leon en velocidad?', res:false, img:'assets/images/pato.jpg', alt: 'pato'}];


//Pantalla principal
router.get('/', (req, res) => {
    res.render('home');
});



//Juego tal cual
router.get('/MacacoPlaying', (req, res) => {
    res.render('game', {"preguntas":preguntas});
});



//Administracion
router.get('/admin', (req, res) => {
    res.render('adminPanel', {"preguntas": preguntas});
});



//Reordenamiento de la lista
router.post('/admin', (req, res) => {
    preguntas = req.body.newOrder.map((n) => preguntas[n]);
    res.status(200).send('Preguntas reordenadas en: ' + req.body.newOrder);
});



//Eliminacion de pregunta
router.delete('/admin/remove/ID-:pregId', (req, res) => {
    console.log(req.params);
    preguntas = preguntas.filter((p) => p.id !== req.params.pregId);
    res.status(200).send('Pregunta '+req.params.pregId+' eliminada');
});



//Administracion de nuevas preguntas
router.put('/admin/newQuestion', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    console.log("macaco");
    res.status(200).send('Pregunta añadida');
});


module.exports = router;