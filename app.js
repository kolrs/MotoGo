// ======================
// FIREBASE
// ======================

const firebaseConfig = {

  apiKey:
  "AIzaSyCChsHu845YVdkdg_7PHw92vy3g_HeDoqM",

  authDomain:
  "motogo-cea1b.firebaseapp.com",

  databaseURL:
  "https://motogo-cea1b-default-rtdb.firebaseio.com",

  projectId:
  "motogo-cea1b",

  storageBucket:
  "motogo-cea1b.firebasestorage.app",

  messagingSenderId:
  "931660222103",

  appId:
  "1:931660222103:web:9f2b82926b4d996223a3d2",

  measurementId:
  "G-NKP4C70YPW"

};

firebase.initializeApp(
  firebaseConfig
);

const db =
firebase.database();


// ======================
// MAPA
// ======================

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

  const recogidaInput =
  document.getElementById(
    "recogida"
  );

  const destinoInput =
  document.getElementById(
    "destino"
  );

  if(recogidaInput){

    new google.maps.places.Autocomplete(
      recogidaInput
    );

  }

  if(destinoInput){

    new google.maps.places.Autocomplete(
      destinoInput
    );

  }

}


// ======================
// GUARDAR VIAJE
// ======================

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
        precio.toFixed(0),

        estado:
        "pendiente",

        timestamp:
        Date.now()

      };

      db.ref("viajes").push(
        nuevoViaje
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


// ======================
// CONFIRMAR VIAJE
// ======================

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

`https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;

  window.location.href =
  url;

}


// ======================
// PANEL CONDUCTOR
// ======================

let viajeActualKey = null;

function mostrarDatosConductor(){

  db.ref("viajes")
  .on("value",(snapshot)=>{

    const data =
    snapshot.val();

    if(!data){

      limpiarPanel();

      return;

    }

    const viajes =
    Object.entries(data);

    const pendientes =
    viajes.filter(

      ([key,viaje])=>

      viaje.estado ===
      "pendiente"

    );

    if(
      pendientes.length === 0
    ){

      limpiarPanel();

      return;

    }

    pendientes.sort(

      (a,b)=>

      a[1].timestamp -
      b[1].timestamp

    );

    const [
      key,
      viaje

    ] = pendientes[0];

    viajeActualKey = key;

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

  });

}


// ======================
// LIMPIAR PANEL
// ======================

function limpiarPanel(){

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


// ======================
// IR POR CLIENTE
// ======================

function irPorCliente(){

  const recogida =
  document.getElementById(
    "mostrarRecogida"
  ).innerText;

  if(
    recogida === "-"
  ) return;

  const url =

`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(recogida)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}


// ======================
// INICIAR VIAJE
// ======================

function iniciarViaje(){

  const recogida =
  document.getElementById(
    "mostrarRecogida"
  ).innerText;

  const destino =
  document.getElementById(
    "mostrarDestino"
  ).innerText;

  if(
    recogida === "-" ||
    destino === "-"
  ) return;

  const url =

`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(recogida)}&destination=${encodeURIComponent(destino)}&travelmode=driving`;

  window.open(
    url,
    "_blank"
  );

}


// ======================
// AVISAR CLIENTE
// ======================

function avisarCliente(){

  const telefono =
  document.getElementById(
    "mostrarTelefono"
  ).innerText;

  const nombre =
  document.getElementById(
    "mostrarNombre"
  ).innerText;

  const tiempo =
  document.getElementById(
    "mostrarTiempo"
  ).innerText;

  if(
    telefono === "-"
  ) return;

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

`https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;

  window.open(
    url,
    "_blank"
  );

}


// ======================
// FINALIZAR VIAJE
// ======================

function finalizarViaje(){

  if(!viajeActualKey){

    alert(
      "No hay viaje"
    );

    return;

  }

  db.ref(
    "viajes/" +
    viajeActualKey
  ).update({

    estado:
    "finalizado"

  });

  alert(
    "Viaje finalizado"
  );

}