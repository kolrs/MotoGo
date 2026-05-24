function irSolicitud(){ window.location.href = "solicitar.html"; }

function guardarDatos(){
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const recogida = document.getElementById("recogida").value;
  const destino = document.getElementById("destino").value;

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("recogida", recogida);
  localStorage.setItem("destino", destino);

  const service = new google.maps.DirectionsService();
  service.route({
    origin: recogida,
    destination: destino,
    travelMode: 'DRIVING',
  }, (result, status) => {
    if(status === 'OK'){
      const distanceText = result.routes[0].legs[0].distance.text;
      const durationText = result.routes[0].legs[0].duration.text;
      localStorage.setItem("distance", distanceText);
      localStorage.setItem("duration", durationText);
    localStorage.setItem(
  "viajeActivo",
  "si"
);  window.location.href = "cotizacion.html";
    } else {
      alert('No se pudo calcular la ruta. Intenta otra dirección.');
    }
  });
}

function irConfirmacion(){ window.location.href = "confirmacion.html"; }
function volverInicio(){ window.location.href = "index.html"; }

function enviarWhatsApp(){
  const nombre = localStorage.getItem("nombre");
  const recogida = localStorage.getItem("recogida");
  const destino = localStorage.getItem("destino");
  const distancia = localStorage.getItem("distance");
  const duracion = localStorage.getItem("duration");
  const km = parseFloat(distancia.replace(" km","".replace(",",".")));
  const precio = 25 + (km*5);
  const mensaje = `🏍️ MotoGo\n\nCliente: ${nombre}\n📍 Recogida: ${recogida}\n🏁 Destino: ${destino}\n🛣️ Distancia: ${distancia}\n⏱️ Tiempo estimado: ${duracion}\n💰 Total: $${precio.toFixed(0)} MXN`;
  const numero = "5212383984676";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function mostrarDatosConductor(){
  document.getElementById("mostrarNombre").innerText = localStorage.getItem("nombre");
  document.getElementById("mostrarTelefono").innerText = localStorage.getItem("telefono");
  document.getElementById("mostrarRecogida").innerText = localStorage.getItem("recogida");
  document.getElementById("mostrarDestino").innerText = localStorage.getItem("destino");
  document.getElementById("mostrarDistancia").innerText = localStorage.getItem("distance");
  document.getElementById("mostrarTiempo").innerText = localStorage.getItem("duration");
}
if(window.location.href.includes("conductor.html")){ mostrarDatosConductor(); }
function llegareEn(minutos){ alert(`El conductor llegará en ${minutos} minutos`); }
function abrirMaps(){

  const recogida =
    localStorage.getItem("recogida");

  const url =

`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(recogida)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}
function avisarCliente(){

  const telefono =
    localStorage.getItem("telefono");

  const nombre =
    localStorage.getItem("nombre");

  const tiempo =
    localStorage.getItem("duration");

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

}function irPorCliente(){

  const recogida =
    localStorage.getItem("recogida");

  const url =

`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(recogida)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}

function iniciarViaje(){

  const recogida =
    localStorage.getItem("recogida");

  const destino =
    localStorage.getItem("destino");

  const url =

`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(recogida)}&destination=${encodeURIComponent(destino)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}function initMap(){

  const ubicacion = {

    lat:18.4665,
    lng:-97.4000

  };

  const map =
    new google.maps.Map(

      document.getElementById("map"),

      {

        zoom:14,

        center:ubicacion

      }

    );

  new google.maps.places.Autocomplete(
    document.getElementById("recogida")
  );

  new google.maps.places.Autocomplete(
    document.getElementById("destino")
  );

}function mostrarDatosConductor(){

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

if(
window.location.href.includes(
  "conductor.html"
)){

  mostrarDatosConductor();

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

  localStorage.removeItem(
    "viajeActivo"
  );

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

  alert(
    "Viaje finalizado"
  );

  window.location.reload();

}function verificarViajeActivo(){

  const viajeActivo =
  localStorage.getItem(
    "viajeActivo"
  );

  if(
    !viajeActivo &&
    window.location.href.includes(
      "conductor.html"
    )
  ){

    document.body.innerHTML = `

    <div
    style="
    background:#111827;
    color:white;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:Arial;
    ">

    <h1>
    No hay viajes activos
    </h1>

    </div>

    `;

  }

}

verificarViajeActivo();