let preg_num = 0;
let puntaje = {num: preguntas.length, right:0}
let tiempo = {segundos:0, centesimas:0};

//Contador
const contadorElemento = document.querySelector(".contador");
setInterval(function() {
    tiempo.centesimas++;
    if(tiempo.centesimas>=100){
        tiempo.segundos++;
        tiempo.centesimas = 0;
    }
  contadorElemento.textContent = tiempo.segundos.toString().padStart(2, '0') +':'+ tiempo.centesimas.toString().padStart(2, '0');
}, 1000);



//Eventos de Pulsacion de teclas
document.addEventListener('keydown', (event)=>{
    if (event.code === 'ArrowLeft') {
        is_false();
        //deslizarTarjeta('izquierda');
      } else if (event.code === 'ArrowRight') {
        is_true();
        //deslizarTarjeta('derecha');
    }
});

//Funcion de experimentacion de css
function deslizarTarjeta(direccion) {
    const tarjeta = document.querySelector('.middle-block');
    tarjeta.classList.add(direccion);
}

//El usuario dice que la pregunta es correcta y se valida
function is_true(){
    if(preguntas[preg_num].res == true){
        alert('Correcto');
        puntaje.right++;
    }else{
        alert('Incorrecto');
    }
    change_question();
}

//El usuario dice que la pregunta es incorrecta y se valida
function is_false(){
    if(preguntas[preg_num].res == false){
        alert('Correcto');
        puntaje.right++;
    }else{
        alert('Incorrecto');
    }
    change_question();
}

//Se cambia de pregunta
function change_question(){
    preg_num++;

    if(preg_num >= preguntas.length){
        alert('Bien hecho: ' + puntaje.right+'/'+puntaje.num)
    }

    let contenido = document.querySelector('.question')

    contenido.textContent = preguntas[preg_num].preg;
}