document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
  
    var texto = document.getElementsByClassName('texto').value;
    var opcion = document.querySelector('input[name="opcion"]:checked').value;
  
    var data = {
      preg: texto,
      res: opcion,
      img: '/images/nutria.png'
    };
  
    fetch('/admin/newQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      // Procesar la respuesta del servidor
      console.log(response);
    })
    .catch(function(error) {
      // Manejar errores
      console.error(error);
    });
  });