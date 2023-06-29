const multer = require("multer");
const path = require('path');
const moment = require('moment');

//Importamos preguntas y modelos
let { preguntas } = require("../data");
const questSchema = require("../models/myModel");


// Carga de imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname));
    }
});
const upload = multer({ storage: storage });


// Añadir signos ¿? si no se los escribio
let stylisize = (quest) => {
    let formalized;
    if (quest[0] !== '¿') {
        formalized = '¿' + quest
    } else {
        formalized = quest;
    }
    if (quest[quest.length - 1] !== '?') {
        formalized = formalized + '?';
    }
    return formalized;
}


/*  Extraemos preguntas de la base de datos y 
    Renderizamos la pagina */
exports.adminPanel = (req, res) => {
    questSchema
        .find({})
        .then(data => {
            console.log(data);
            res.render('adminPanel', { "preguntas": data, "ranking": ranking })
        })
        .catch(error => res.status(500).send(error))
};

// Reordenamos las variables
exports.reorderPregs = (req, res) => {
    preguntas = req.body.newOrder.map((n) => preguntas[n]);
    res.status(200).send('Preguntas reordenadas en: ' + req.body.newOrder);
};

// Borramos la pregunta de mongoDB
exports.deletePreg = (req, res) => {
    console.log(req.params);
    //preguntas = preguntas.filter((p) => p.id !== req.params.pregId);

    questSchema.deleteOne({'id': req.params.pregId});

    res.status(200).send('Pregunta ' + req.params.pregId + ' eliminada');
};

//File Upload con Multer
exports.newQuest = [upload.single('image'), async (req, res) => {

    let lastID;

    try {
        const data = await questSchema.find({}).sort({$natural:-1}).limit(1);
        console.log(data);
        lastID = data[0].id;
        // Aquí puedes realizar más operaciones sincrónicas con lastId
      } 
    catch (error) {
        res.status(500).send(error)
    }
    
    
    //Sumar 1 al id de la ultima pregunta y pasarlo a str
    let id = String(Number(lastID) + 1);
    let preg = stylisize(req.body.preg);

    //Transformar el texto en verdareros booleanos
    let value = req.body.value === 'false' ? false : true; 

    //Flexibilidad en cuanto a poner o no imagen
    let imgRoute = '';
    let altImg = '';
    let noImage = true;
    if (req.hasOwnProperty('file')) {
        imgRoute = '/assets/uploads/' + req.file.originalname;
        altImg = req.file.fieldname;
        noImage = false;
    }

    //Creando estructura
    let obj = {
        'id': id,
        'preg': preg,
        'res': value,
        'img': imgRoute,
        'alt': altImg,
        'noImage': noImage
    }

    //Guardando en variable
    preguntas.push(obj);


    //Crear nuevo documento de mongoDB
    const quest = questSchema(obj);
    quest
        .save()
        .then(data => console.log(data))
        .catch(error => res.status(500).send(error))

    //Informando de lo ocurrido
    console.log(req.body);
    console.log(req.file);
    console.log(preguntas);
    res.status(200).send();
}];

// 
exports.modifyQuest = [upload.single('image'), (req, res) => {
    let id = req.params.pregId;
    let preg = stylisize(req.body.preg);
    let value = req.body.value === 'false' ? false : true; //transform text to bool

    //Encontrar el id de la pregunta correspondiente
    let pregReplace = preguntas.find(p => p.id === id).id;
    
    //Flexibilidad en cuanto a poner o no imagen
    let imgRoute = preguntas[pregReplace].img;
    let altImg = preguntas[pregReplace].alt;
    let noImage = preguntas[pregReplace].noImage;
    if (req.hasOwnProperty('file')) {
        imgRoute = '/assets/uploads/' + req.file.originalname;
        altImg = req.file.fieldname;
        noImage = false;
    }

    //Creando estructura
    let obj = {
        'id': id,
        'preg': preg,
        'res': value,
        'img': imgRoute,
        'alt': altImg,
        'noImage': noImage
    }

    //Guardando en variable
    preguntas[pregReplace] = obj;

    //Modificar documento de mongoDB
    questSchema.replaceOne({'id': id}, obj);

    //Informando de lo ocurrido
    console.log(req.body);
    console.log(req.file);
    console.log(preguntas);
    console.log("Pregunta "+ id + " Modificada");
    res.status(200).send("Pregunta"+ id + "Modificada");
}];
