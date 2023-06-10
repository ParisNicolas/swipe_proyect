const multer = require("multer");
const path = require('path');
//const OneModel = require('../models/myModel');
//const moment = require('moment');
/*
let preguntas = global.preguntas;
let ranking = global.ranking;
*/

//Carga de imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname));
    }
});
const upload = multer({ storage: storage });



let stylisize = (quest)=>{
    let formalized;
    if(quest[0] !== '¿'){
        formalized = '¿' + quest
    }else{
        formalized = quest;
    }
    if(quest[quest.length-1] !== '?'){
        formalized = formalized + '?';
    }
    return formalized;
}




exports.adminPanel = (req, res) => {
    res.render('adminPanel', {"preguntas": preguntas, "ranking":ranking});
};


exports.reorderUsers = (req, res) => {
    preguntas = req.body.newOrder.map((n) => preguntas[n]);
    res.status(200).send('Preguntas reordenadas en: ' + req.body.newOrder);
};


exports.deleteUser = (req, res) => {
    console.log(req.params);
    preguntas = preguntas.filter((p) => p.id !== req.params.pregId);
    res.status(200).send('Pregunta '+req.params.pregId+' eliminada');
};


exports.newQuest = [upload.single('image'),(req, res) => {
    let id = String(Number(preguntas[preguntas.length - 1].id)+1);
    let preg = stylisize(req.body.preg);
    let value = req.body.value === 'false' ? false:true; //transform text to bool
    
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
    console.log(req.file);
    console.log(preguntas);
    res.status(200).send();
}];