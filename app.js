function guardarDatos(){

  const nombre =
  document.getElementById(
    "nombre"
  ).value;

  const telefono =
  document.getElementById(
    "telefono"
  ).value;

  const recogida =
  document.getElementById(
    "recogida"
  ).value;

  const destino =
  document.getElementById(
    "destino"
  ).value;

  localStorage.setItem(
    "nombre",
    nombre
  );

  localStorage.setItem(
    "telefono",
    telefono
  );

  localStorage.setItem(
    "recogida",
    recogida
  );

  localStorage.setItem(
    "destino",
    destino
  );

  const service =
  new google.maps.DirectionsService();

  service.route({

    origin:recogida,

    destination:destino,

    travelMode:'DRIVING'

  },

  (result,status)=>{

    if(status === 'OK'){

      const distancia =
      result.routes[0]
      .legs[0]
      .distance.text;

      const tiempo =
      result.routes[0]
      .legs[0]
      .duration.text;

      localStorage.setItem(
        "distance",
        distancia
      );

      localStorage.setItem(
        "duration",
        tiempo
      );

      localStorage.setItem(
        "viajeActivo",
        "si"
      );

      window.location.href =
      "confirmacion.html";

    }

  });

}

function initMap(){

  const ubicacion = {

    lat:18.4665,
    lng:-97.4000

  };

  const map =
  new google.maps.Map(

    document.getElementById(
      "map"
    ),

    {

      zoom:14,

      center:ubicacion

    }

  );

  new google.maps.places.Autocomplete(

    document.getElementById(
      "recogida"
    )

  );

  new google.maps.places.Autocomplete(

    document.getElementById(
      "destino"
    )

  );

}

function mostrarDatosConductor(){

  document.getElementById(
    "mostrarNombre"
  ).innerText =
  localStorage.getItem(
    "nombre"
  );

  document.getElementById(
    "mostrarTelefono"
  ).innerText =
  localStorage.getItem(
    "telefono"
  );

  document.getElementById(
    "mostrarRecogida"
  ).innerText =
  localStorage.getItem(
    "recogida"
  );

  document.getElementById(
    "mostrarDestino"
  ).innerText =
  localStorage.getItem(
    "destino"
  );

  document.getElementById(
    "mostrarDistancia"
  ).innerText =
  localStorage.getItem(
    "distance"
  );

  document.getElementById(
    "mostrarTiempo"
  ).innerText =
  localStorage.getItem(
    "duration"
  );

}

function irPorCliente(){

  const recogida =
  localStorage.getItem(
    "recogida"
  );

  const url =

`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(recogida)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}

function iniciarViaje(){

  const recogida =
  localStorage.getItem(
    "recogida"
  );

  const destino =
  localStorage.getItem(
    "destino"
  );

  const url =

`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(recogida)}&destination=${encodeURIComponent(destino)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}

function avisarCliente(){

  const telefono =
  localStorage.getItem(
    "telefono"
  );

  const nombre =
  localStorage.getItem(
    "nombre"
  );

  const tiempo =
  localStorage.getItem(
    "duration"
  );

  const mensaje =

`🏍️ MotoGo

Hola ${nombre}

Tu conductor ya va en camino 🚀

⏱️ Tiempo estimado:
${tiempo}

Gracias por usar MotoGo 😎`;

  const numero =
  "52" + telefono;

  const url =

`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(
    url,
    "_blank"
  );

}

function finalizarViaje(){

  localStorage.clear();

  alert(
    "Viaje finalizado"
  );

  window.location.href =
  "index.html";

}