'use strict';

var map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(32.5149, -117.0382), // Ciudad de México
        L.latLng(37.7749, -122.4194) // San Francisco
    ],
    routeWhileDragging: true,
}).addTo(map)


