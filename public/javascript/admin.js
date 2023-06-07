console.log("DOW");

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const createForm = document.getElementById('createForm');

//formualario para nueva pregunta
const formValue = document.getElementById('formValue');
const pregForm = document.getElementById('pregForm');
const imgForm = document.getElementById('imgForm');

let formVal = true;

let changed = false;
let newOrder;
let sortableList = document.getElementById('sortable-list');
      

new Sortable(sortableList, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    handle: '.handle',
    onEnd: function(evt) {
        let items = Array.from(evt.target.querySelectorAll('.list-element'));
        let order = items.map((item) => parseInt(item.getAttribute('data-order')));
        console.log(order);
        newOrder = order;
        
        changed ? 0:alertPlaceholder.classList.remove('d-none');
        changed = true;
    }
});


function enviarSolicitud(data, route, method) {
    fetch(route, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}

//GUARDAR ORDEN
document.getElementById('reset-btn').addEventListener('click', () =>{
    location.reload();
});

document.getElementById('save-btn').addEventListener('click', () =>{
    enviarSolicitud({newOrder: newOrder}, '/admin', 'POST');
    alertPlaceholder.classList.add('d-none')
    changed = false;
});


//ELiminar
function deletePreg(e){
    let parent = e.closest(".list-element");
    parent.remove();
    enviarSolicitud({}, '/admin/remove/ID-' + parent.id, 'DELETE');
}


//FORMULARIO
function spawnCreateForm(){
  createForm.classList.remove('d-none');
}

function changeValueForm(){
  formVal = formVal ? false:true;
  formValue.innerHTML = formVal;
  if(formVal){
    formValue.classList.remove('bg-danger');
    formValue.classList.add('bg-success');
  }else{
    formValue.classList.remove('bg-success');
    formValue.classList.add('bg-danger');
  }
}

function cleanCreateForm(){
  //limpia
  formVal = true;
  formValue.value = formVal;
  pregForm.value = "";
  imgForm.value = "";

  //despawnea
  createForm.classList.add('d-none'); 
}

function createQuest(){
  let imagen = imgForm.files[0]; // Obtener la imagen seleccionada
  let valor = formVal;
  let pregunta =  pregForm.value;

  let formData = new FormData();
  formData.append('value', valor);
  formData.append('preg', pregunta);
  formData.append('image', imagen); // Agregar la imagen al objeto FormData
  

  fetch('/admin/newQuestion', {
    method: 'PUT',
    body: formData
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    // Manejar errores
  });
  cleanCreateForm();
}

