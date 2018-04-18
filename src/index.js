import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import countiesJson from './data/barrios_cali.geo.json';


// inicializar mapa
const map = L.map('map').setView([3.428405, -76.540564], 11);

// añadir capa de de apariencia del mapa
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.light',
}).addTo(map);

// añadir capa con la definicion de los barrios en el mapa
const countyStyle = {
	color: '#ff7800',
	weight: 5,
	opacity: 0.65,
};

const geojsonMarkerOptions = {
	radius: 8,
	fillColor: '#ff7800',
	color: '#000',
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8,
};

L.geoJSON(countiesJson, {
	style: countyStyle,
	pointToLayer(feature, latlng) {
		return L.circleMarker(latlng, geojsonMarkerOptions);
	},
}).addTo(map);

