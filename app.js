function obtenerViajes(){

  return JSON.parse(

    localStorage.getItem(
      "viajes"
    )

  ) || [];

}

function guardarViajes(viajes){

  localStorage.setItem(
    "viajes",
    JSON.stringify(viajes)
  );

}

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

  if(
    !nombre ||
    !telefono ||
    !recogida ||
    !destino
  ){

    alert(
      "Completa todos los campos"
    );

    return;

  }

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

      const km =
      parseFloat(
        distancia
        .replace(" km","")
        .replace(",",".")
      );

      const precio =
      25 + (km * 5);

      const nuevoViaje = {

        nombre,
        telefono,
        recogida,
        destino,
        distancia,
        tiempo,
        precio:
        precio.toFixed(0)

      };

      const viajes =
      obtenerViajes();

      viajes.push(
        nuevoViaje
      );

      guardarViajes(
        viajes
      );

      window.location.href =
      "confirmacion.html";

    }

    else{

      alert(
        "No se pudo calcular la ruta"
      );

    }

  });

}

function confirmarViaje(){

  const viajes =
  obtenerViajes();

  const ultimoViaje =
  viajes[
    viajes.length - 1
  ];

  const mensaje =

`🏍️ MotoGo

👤 Cliente:
${ultimoViaje.nombre}

📞 Teléfono:
${ultimoViaje.telefono}

📍 Recogida:
${ultimoViaje.recogida}

🏁 Destino:
${ultimoViaje.destino}

🛣️ Distancia:
${ultimoViaje.distancia}

⏱️ Tiempo:
${ultimoViaje.tiempo}

💰 Total:
$${ultimoViaje.precio} MXN`;

  const numero =
  "5212383984676";

  const url =

`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(
    url,
    "_blank"
  );

  setTimeout(()=>{

    window.location.href =
    "index.html";

  },1000);

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

  setInterval(()=>{

    const viajes =
    obtenerViajes();

    const viaje =
    viajes[0];

    if(!viaje){

      document.getElementById(
        "mostrarNombre"
      ).innerText = "-";

      document.getElementById(
        "mostrarTelefono"
      ).innerText = "-";

      document.getElementById(
        "mostrarRecogida"
      ).innerText = "-";

      document.getElementById(
        "mostrarDestino"
      ).innerText = "-";

      document.getElementById(
        "mostrarDistancia"
      ).innerText = "-";

      document.getElementById(
        "mostrarTiempo"
      ).innerText = "-";

      return;

    }

    document.getElementById(
      "mostrarNombre"
    ).innerText =
    viaje.nombre;

    document.getElementById(
      "mostrarTelefono"
    ).innerText =
    viaje.telefono;

    document.getElementById(
      "mostrarRecogida"
    ).innerText =
    viaje.recogida;

    document.getElementById(
      "mostrarDestino"
    ).innerText =
    viaje.destino;

    document.getElementById(
      "mostrarDistancia"
    ).innerText =
    viaje.distancia;

    document.getElementById(
      "mostrarTiempo"
    ).innerText =
    viaje.tiempo;

  },1000);

}

function irPorCliente(){

  const viajes =
  obtenerViajes();

  const viaje =
  viajes[0];

  if(!viaje) return;

  const url =

`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(viaje.recogida)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}

function iniciarViaje(){

  const viajes =
  obtenerViajes();

  const viaje =
  viajes[0];

  if(!viaje) return;

  const url =

`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(viaje.recogida)}&destination=${encodeURIComponent(viaje.destino)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}

function avisarCliente(){

  const viajes =
  obtenerViajes();

  const viaje =
  viajes[0];

  if(!viaje) return;

  const mensaje =

`🏍️ MotoGo

Hola ${viaje.nombre}

Tu conductor ya va en camino 🚀

⏱️ Tiempo estimado:
${viaje.tiempo}

Gracias por usar MotoGo 😎`;

  const numero =
  "52" + viaje.telefono;

  const url =

`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(
    url,
    "_blank"
  );

}

function finalizarViaje(){

  const viajes =
  obtenerViajes();

  viajes.shift();

  guardarViajes(
    viajes
  );

  alert(
    "Viaje finalizado"
  );

}