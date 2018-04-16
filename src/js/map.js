import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// inicializar mapa
const map = L.map('map').setView([39.74739, -105], 13);

// añadir capa de de apariencia del mapa
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.light',
}).addTo(map);

// cargar archivo json que contiene definicion de los barrios de Cali
loadJSON('../data/barrios_cali.geojson', (data) => {
	// una vez la informacion este cargada, la añadimos como una capa al mapa
	L.geoJSON(data).addTo(map);
});
