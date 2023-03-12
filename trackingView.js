'use strict';

document.onload = function(){

    let ID_envio = document.querySelector('.id-envio span');
    let ID_top = document.querySelector('#numero-envio');
    let pais_envio = document.querySelector('.pais-origen span');
    let pais_destino = document.querySelector('.pais-destino span');
    let iconos = document.querySelectorAll('#tracking-icons li');
    let status = document.querySelector('.tracking-container h2 span');

    const url = window.location.search
    const urlParams = new URLSearchParams(url);
    const value = urlParams.get('id');

    if(value){
        const obtenerEnvios = () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(envios);
              }, 4000);
            });
          }

          obtenerEnvios().then(envios =>{
            envios.forEach(envio =>{
                if(envio.id == value){
                    console.log(envio)
                    ID_envio.innerHTML = envio.id;
                    ID_top.innerHTML = envio.id
                    pais_envio.innerHTML = envio.ciudadEnvio;
                    pais_destino.innerHTML = envio.ciudadDestino;
                    status.innerHTML = envio.estatusEnvio

                    var map = L.map('map');

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);


                    L.Routing.control({
                        waypoints: [
                            L.latLng(envio.latitudOrigen, envio.longitudOrigen), // Empieza
                            L.latLng(envio.latitudDestino, envio.longitudDestino) // Termina
                        ],
                        routeWhileDragging: false,
                        draggableWaypoints: false,
                    }).addTo(map);


                    iconos.forEach(function() {
                        if (envio.estatusEnvio == 'preparacion') {
                            document.querySelector('.preparacion').classList.add('ready');
                        }else if (envio.estatusEnvio == 'en camino'){
                            document.querySelector('.en-camino').classList.add('ready');
                            document.querySelector('.preparacion').classList.add('ready');
                        }else if (envio.estatusEnvio == 'entregado'){
                            document.querySelector('.en-camino').classList.add('ready');
                            document.querySelector('.preparacion').classList.add('ready');
                            document.querySelector('.entregado').classList.add('ready');
                        }
                    })
                }

            })
          });
}

}();


const envios = [
    {
      id: 1,
      ciudadEnvio: 'Madrid',
      ciudadDestino: 'Barcelona',
      estatusEnvio: 'en camino',
      latitudOrigen: 40.4168,
      longitudOrigen: -3.7038,
      latitudDestino: 41.3851,
      longitudDestino: 2.1734
    },
    {
      id: 2,
      ciudadEnvio: 'Londres',
      ciudadDestino: 'Edimburgo',
      estatusEnvio: 'entregado',
      latitudOrigen: 51.5074,
      longitudOrigen: -0.1278,
      latitudDestino: 55.9533,
      longitudDestino: -3.1883
    },
    {
      id: 3,
      ciudadEnvio: 'Nueva York',
      ciudadDestino: 'Los Ángeles',
      estatusEnvio: 'preparacion',
      latitudOrigen: 40.7128,
      longitudOrigen: -74.0060,
      latitudDestino: 34.0522,
      longitudDestino: -118.2437
    }
  ];
