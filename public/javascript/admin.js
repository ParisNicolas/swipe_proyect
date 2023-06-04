console.log("DOW");

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

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


document.getElementById('reset-btn').addEventListener('click', () =>{
    location.reload();
});

document.getElementById('save-btn').addEventListener('click', () =>{
    enviarSolicitud({newOrder: newOrder}, '/admin', 'POST');
    alertPlaceholder.classList.add('d-none')
    changed = false;
});


function deletePreg(e){
    let parent = e.closest(".list-element");
    parent.remove();
    enviarSolicitud({}, '/admin/remove/ID-' + parent.id, 'DELETE');
}
