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

      fetch(`http://143.244.153.84/api/boxes/${value}`)
        .then(response => response.json())
        .then(data => {
          
            console.log(data.data)
            ID_envio.innerHTML = data.data.uuid;
            ID_top.innerHTML = data.data.uuid
            pais_envio.innerHTML = data.data.origin.city;
            pais_destino.innerHTML = data.data.destination.city;

            var map = L.map('map');

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);


            L.Routing.control({
                waypoints: [
                    L.latLng(data.data.origin.lat, data.data.origin.long), // Empieza
                    L.latLng(data.data.destination.lat, data.data.destination.long) // Termina
                ],
                routeWhileDragging: false,
                draggableWaypoints: false,
            }).addTo(map);


            iconos.forEach(function() {
                if (data.data.status == 'draft' || data.data.status == 'created') {
                    document.querySelector('.preparacion').classList.add('ready');
                    status.innerHTML = 'En preparación'
                }else if (data.data.status == 'in_progress'){
                    document.querySelector('.en-camino').classList.add('ready');
                    document.querySelector('.preparacion').classList.add('ready');
                    status.innerHTML = 'En camino'
                }else if (data.data.status == 'delivered'){
                    document.querySelector('.en-camino').classList.add('ready');
                    document.querySelector('.preparacion').classList.add('ready');
                    document.querySelector('.entregado').classList.add('ready');
                    status.innerHTML = 'Entregado'
                }
            })
        })
        .catch(error => console.error(error))
}

}();