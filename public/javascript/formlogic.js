///////////////////**FORMULARIOS**////////////////////////////

const createForm = document.getElementById('createForm');
let elementoOriginal;
let nuevoElemento;
let editing = false;

//Mostrar formulario
function spawnCreateForm(){
  createForm.classList.remove('d-none');
}

//Obtener el formulario dependiendo el contexto
function getForm(formNum){
  return formNum ? document.getElementById('modifyForm'):createForm;
}

//Cambiar la respuesta de la pregunta
function changeValueForm(formNum){
  let form = getForm(formNum);
  let formVal = form.elements.value; //Valor oculto del formulario
  let formValueText = form.querySelector('.valText'); //Valor visual

  //Cambia el valor booleano de la entrada y coloca el texto
  formVal.value = formVal.value == 'true' ? false:true;
  formValueText.innerText = formVal.value;
  
  //Cambia el fondo
  if(formVal.value == 'true'){
    formValueText.classList.remove('bg-danger');
    formValueText.classList.add('bg-success');
  }else{
    formValueText.classList.remove('bg-success');
    formValueText.classList.add('bg-danger');
  }
}

//PONE EN MODO EDICION LA PREGUNTA
function putModifyForm(e){
  if(editing == false){
    elementoOriginal = e.closest(".list-element");
    const formulario = document.getElementById('modifyFormDiv');

    editing = true;

    // Crear un nuevo elemento
    nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = formulario.innerHTML;

    form1 = nuevoElemento.firstElementChild;
    form1.id = 'modifyForm';
    form1.classList.remove('d-none');
    form1.elements.preg.value = elementoOriginal.querySelector('.pregunta').innerText;

    nuevoElemento.firstElementChild

    // Reemplazar el elemento original
    elementoOriginal.replaceWith(nuevoElemento);
  }
}


//ENVIAR NUEVAS PREGUNTAS
function sendQuest(formNum, route, method){
  //event.preventDefault();
  let form = getForm(formNum)

  fetch(route, {
    method: method,
    body: new FormData(form), 
  })
  .then(response => {
      // Redireccionar o actualizar la página según sea necesario
      window.location.href = '/admin';
  })
  .catch(error => {
    // Manejar el error de la petición
  });
}


///NUEVA PREGUNTA///
//Enviar pregunta
document.getElementById('newQuest').addEventListener('click', () =>{
  sendQuest(0, '/admin/newQuestion', 'PUT');
});

//Cabiar valor
document.getElementById('formValue').addEventListener('click', () =>{
  changeValueForm(0)
});

//Limpiar formulario
document.getElementById('cleanCreateForm').addEventListener('click', () =>{
  if(createForm.elements.value.value !== 'true'){
    changeValueForm(0);
  }
  createForm.reset();
  //despawnea
  createForm.classList.add('d-none'); 
});



//Resetear edicion de pregunta
function cancelModify(){
  nuevoElemento.replaceWith(elementoOriginal);
  editing = false;
}