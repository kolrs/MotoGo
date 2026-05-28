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

      const km =
      parseFloat(
        distancia
        .replace(" km","")
        .replace(",",".")
      );

      const precio =
      25 + (km * 5);

      localStorage.setItem(
        "precio",
        precio.toFixed(0)
      );
      localStorage.setItem(
  "nuevoViaje",
  Date.now()
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

  const nombre =
  localStorage.getItem(
    "nombre"
  );

  const telefono =
  localStorage.getItem(
    "telefono"
  );

  const recogida =
  localStorage.getItem(
    "recogida"
  );

  const destino =
  localStorage.getItem(
    "destino"
  );

  const distancia =
  localStorage.getItem(
    "distance"
  );

  const tiempo =
  localStorage.getItem(
    "duration"
  );

  const precio =
  localStorage.getItem(
    "precio"
  );

  const mensaje =

`🏍️ MotoGo

👤 Cliente:
${nombre}

📞 Teléfono:
${telefono}

📍 Recogida:
${recogida}

🏁 Destino:
${destino}

🛣️ Distancia:
${distancia}

⏱️ Tiempo:
${tiempo}

💰 Total:
$${precio} MXN`;

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

    document.getElementById(
      "mostrarNombre"
    ).innerText =

    localStorage.getItem(
      "nombre"
    ) || "-";

    document.getElementById(
      "mostrarTelefono"
    ).innerText =

    localStorage.getItem(
      "telefono"
    ) || "-";

    document.getElementById(
      "mostrarRecogida"
    ).innerText =

    localStorage.getItem(
      "recogida"
    ) || "-";

    document.getElementById(
      "mostrarDestino"
    ).innerText =

    localStorage.getItem(
      "destino"
    ) || "-";

    document.getElementById(
      "mostrarDistancia"
    ).innerText =

    localStorage.getItem(
      "distance"
    ) || "-";

    document.getElementById(
      "mostrarTiempo"
    ).innerText =

    localStorage.getItem(
      "duration"
    ) || "-";

  },1000);

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

Ya voy en camino 🚀

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

  localStorage.removeItem(
    "nombre"
  );

  localStorage.removeItem(
    "telefono"
  );

  localStorage.removeItem(
    "recogida"
  );

  localStorage.removeItem(
    "destino"
  );

  localStorage.removeItem(
    "distance"
  );

  localStorage.removeItem(
    "duration"
  );

  localStorage.removeItem(
    "precio"
  );

  alert(
    "Viaje finalizado"
  );

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

}