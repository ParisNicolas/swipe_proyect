
let card = document.querySelector('.middle-block');
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

function showAlert(direction) {
  if (direction === 'right') {
    alert('¡Derecha!');
  } else if (direction === 'left') {
    alert('¡Izquierda!');
  }
}


//Deslizar dedo
let startPosX = 0;
let currentPosX = 0;

card.addEventListener('touchstart', function(event) {
  startPosX = event.touches[0].clientX;
});

card.addEventListener('touchmove', function(event) {
  event.preventDefault();
  currentPosX = event.touches[0].clientX;
});

card.addEventListener('touchend', function(event) {
  var deltaX = currentPosX - startPosX;
  if (deltaX > 50) {
    // Deslizamiento hacia la derecha
    console.log('Deslizamiento hacia la derecha');
    verificar(true);
  } else if (deltaX < -50) {
    // Deslizamiento hacia la izquierda
    console.log('Deslizamiento hacia la izquierda');
    verificar(false);
  }
});


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
        showToast('Correcto', true);
        puntaje.right++;
    }else{
        showToast('Incorrecto', false);
    }
    cambiar_pregunta();
}


//Se cambia de pregunta
function cambiar_pregunta(){
    preg_num++;

    if(preg_num >= preguntas.length){
        Swal.fire({
            title: 'Bien hecho: '+ puntaje.right+'/'+puntaje.num,
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



function showToast(message, isSuccess) {
  var toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = message;

  if (isSuccess) {
    toast.classList.add('success');
  } else {
    toast.classList.add('error');
  }

  document.body.appendChild(toast);

  setTimeout(function() {
    toast.classList.add('show');
  }, 100);

  setTimeout(function() {
    toast.classList.add('hide');
    setTimeout(function() {
      toast.parentNode.removeChild(toast);
    }, 200);
  }, 1500);
}