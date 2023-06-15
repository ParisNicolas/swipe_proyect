const {preguntas, ranking} = require('./data');
global.preguntas = preguntas;
global.ranking = ranking;
const myController = require('./controllers/myController');
const adminController = require('./controllers/adminController');
const express = require('express');
const router = express.Router();


//Pantalla principal
router.route('/').get(myController.home);

//Juego tal cual
router.route('/MacacoPlaying').get(myController.game);

router.route('/ranking/:name').post(myController.rank);

//Administracion
router.route('/admin').get(adminController.adminPanel);

//Reordenamiento de la lista
router.route('/admin').post(adminController.reorderUsers);

//Eliminacion de pregunta
router.route('/admin/remove/ID-:pregId').delete(adminController.deleteUser);

//Administracion de nuevas preguntas
router.route('/admin/newQuestion').put(adminController.newQuest);

// Modificar la pregunta
router.route('/admin/modify/ID-:pregId').post(adminController.modifyQuest);


/*
router.post('/admin/newQuestion', upload.single('image'), (req, res) => {
    let id = String(Number(preguntas[preguntas.length - 1].id)+1);
    let preg = stylisize(req.body.preg);
    let value = req.body.value === 'false' ? false:true; //transform text to bool
console.log(req.files);
    let imgRoute = '';
    let altImg = '';
    let noImage = true;
    if(req.hasOwnProperty('file')){
        imgRoute = '/assets/uploads/' + req.file.originalname;
        altImg = req.file.fieldname;
        noImage = false;
    }

    preguntas.push({id: id, 
                    preg: preg, 
                    res: value, 
                    img: imgRoute, 
                    alt: altImg,
                    noImage: noImage});

    console.log(req.body);
    
    console.log(preguntas);
    res.status(200).send();
});
*/


module.exports = router;