

let preg_num = -1; //Permitir colocar la primera pregunta (-1+1 = preguntas[0])
let puntaje = {num: preguntas.length, right:0}
let tiempo = {segundos:0, decimas:0};

//Contador
const contadorElemento = document.querySelector(".contador");
setInterval(function() {
    tiempo.decimas++;
    if(tiempo.decimas>=10){
        tiempo.segundos++;
        tiempo.decimas = 0;
    }
  contadorElemento.textContent = tiempo.segundos.toString().padStart(2, '0') +':'+ tiempo.decimas.toString();
}, 100);



//Eventos de Pulsacion de teclas
document.addEventListener('keydown', (event)=>{
    if (event.code === 'ArrowLeft') {
        verificar(false);
        //deslizarTarjeta('izquierda');
      } else if (event.code === 'ArrowRight') {
        verificar(true);
        //deslizarTarjeta('derecha');
    }
});

//Funcion de experimentacion de css
function deslizarTarjeta(direccion) {
    const tarjeta = document.querySelector('.middle-block');
    tarjeta.classList.add(direccion);
}

//El usuario dice que la pregunta es correcta y se valida
function verificar(val){
    if(preguntas[preg_num].res == val){
        Swal.fire({
            text: "Incorrecto",
            background: "transparent",
            showConfirmButton: false,
            timer: 1000, // Duración de 1 segundo en milisegundos
            position: "top",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });
          
          // Eliminar el alert/toast después de 2 segundos
          setTimeout(function() {
            Swal.close();
          }, 2000);

        puntaje.right++;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'It is wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
    cambiar_pregunta();
}


//Se cambia de pregunta
function cambiar_pregunta(){
    preg_num++;

    if(preg_num >= preguntas.length){
        Swal.fire({
            title: 'Bien hecho: ',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
        //alert('Bien hecho: ' + puntaje.right+'/'+puntaje.num)
    }

    let contenido = document.querySelector('.question')
    contenido.textContent = preguntas[preg_num].preg;
    
    let imagen = document.querySelector('.preg_img')
    const pregunta = preguntas[preg_num];
    if(pregunta.noImage){
        imagen.style.display = 'none'
    }else{
        imagen.style.display = 'inline'
    }
    imagen.src = pregunta.img;
    imagen.alt = pregunta.alt;
}

//Poner la primera pregunta;
cambiar_pregunta();
