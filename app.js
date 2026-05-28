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
        .replace(",", ".")

      );

      const precio =
      25 + (km * 5);

      const nuevoViaje = {

        id: Date.now(),

        nombre:
        nombre,

        telefono:
        telefono,

        recogida:
        recogida,

        destino:
        destino,

        distancia:
        distancia,

        tiempo:
        tiempo,

        precio:
        precio.toFixed(0)

      };

      const viajes =

      JSON.parse(

        localStorage.getItem(
          "viajes"
        )

      ) || [];

      viajes.push(
        nuevoViaje
      );

      localStorage.setItem(

        "viajes",

        JSON.stringify(
          viajes
        )

      );

      localStorage.setItem(

        "ultimoViaje",

        JSON.stringify(
          nuevoViaje
        )

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

  const viaje =

  JSON.parse(

    localStorage.getItem(
      "ultimoViaje"
    )

  );

  if(!viaje){

    alert(
      "No hay viaje"
    );

    return;

  }

  const mensaje =

`🏍️ MotoGo

👤 Cliente:
${viaje.nombre}

📞 Teléfono:
${viaje.telefono}

📍 Recogida:
${viaje.recogida}

🏁 Destino:
${viaje.destino}

🛣️ Distancia:
${viaje.distancia}

⏱️ Tiempo:
${viaje.tiempo}

💰 Total:
$${viaje.precio} MXN`;

  const numero =
  "5212383984676";

  const url =

`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.location.href =
  url;

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

  function actualizar(){

    const viajes = JSON.parse(

      localStorage.getItem(
        "viajes"
      )

    ) || [];

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

  }

  actualizar();

  window.addEventListener(

    "storage",

    actualizar

  );

  setInterval(
    actualizar,
    1000
  );

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

  let viajes = JSON.parse(

    localStorage.getItem(
      "viajes"
    )

  ) || [];

  viajes.shift();

  localStorage.setItem(

    "viajes",

    JSON.stringify(
      viajes
    )

  );

  alert(
    "Viaje finalizado"
  );

}