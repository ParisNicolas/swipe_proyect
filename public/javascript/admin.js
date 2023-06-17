console.log("DOW");

//Alert de guardar cambios
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

//Variables de la lista ordenable
let changed = false;
let newOrder;
let sortableList = document.getElementById('sortable-list');
      
//Nuevo elemento ordenable con la libreria Sortable.min.js
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

//Modularizacion del envio de solicitudes
function enviarSolicitud(data, route, method, func) {
    fetch(route, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if(func){
        func()
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}

//Evento resetear orden
document.getElementById('reset-btn').addEventListener('click', () =>{
    location.reload();
});
//Evento guardar orden
document.getElementById('save-btn').addEventListener('click', () =>{
    enviarSolicitud({newOrder: newOrder}, '/admin', 'POST');
    alertPlaceholder.classList.add('d-none')
    changed = false;
});

//ELiminar pregunta
function deletePreg(e){
    let parent = e.closest(".list-element");
    parent.remove();
    enviarSolicitud({}, '/admin/remove/ID-' + parent.id, 'DELETE');
}