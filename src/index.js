import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
import countiesJson from './data/barrios_cali.geo.json';
import emergencias from './data/emergencias.json';


// inicializar mapa
const map = L.map('map').setView([3.428405, -76.540564], 12);
map.options.minZoom = 12;
map.options.maxZoom = 13;

// añadir capa de de apariencia del mapa
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
			'Datos proveidos por el gobierno <a href="https://datos.gov.co/">Datos Abiertos</a>, ' +
			'Concepto por <a href="http://netmidas.com">Netmidas</a>',
	id: 'mapbox.light',
}).addTo(map);
//  obtener informacion desde csv para añadir los marcadores
const infoComunas = {};
const coloresComuna = [
	'#328B95',
	'#5AB03B',
	'#73C144',
	'#AB98DD',
	'#34659D',
	'#226766',
	'#7C2E8A',
	'#5B6BC8',
	'#632267',
	'#822B51',
	'#C44FA7',
	'#CF6EB6',
	'#CF726E',
	'#DBA394',
	'#E9D8BE',
	'#DDD098',
	'#C0E7D4',
	'#A7CCED',
	'#1D4E39',
	'#232A5C',
	'#EAFF61',
	'#61FFCD',
	'#82A0BC',
];

// añadir caja de información de la simbologia de colores del mapa
const legend = L.control({ position: 'bottomleft' });
legend.onAdd = () => {
	const div = L.DomUtil.create('div', 'info legend');
	div.innerHTML = '<h4>Comunas Cali</h4>';
	div.innerHTML += '<ul>';
	for (let i = 1; i < coloresComuna.length; i += 1) {
		div.innerHTML += `<li><i style="background: ${coloresComuna[i]}"></i> Comuna ${i}</li>`;
	}
	div.innerHTML += '</ul>';
	return div;
};

legend.addTo(map);

const icons = {
	incendio: '<i class="fas fa-fire"></i>',
	inundacion: '<i class="fas fa-tint"></i>',
	deslizamiento: '<i class="fas fa-globe"></i>',
	vendaval: '<i class="fas fa-cloud"></i>',
};

const tiposEventos = {
	12: 'incendio',
	13: 'inundacion',
	14: 'deslizamiento',
	15: 'vendaval',
};

const registros = Object.entries(emergencias.data);
registros.forEach((registro) => {
	const info = registro[1];
	const comuna = info[11];
	let infoComuna = {
		incendio: 0,
		vendaval: 0,
		inundacion: 0,
		deslizamiento: 0,
	};
	if (Object.keys(infoComunas).indexOf(comuna) >= 0) {
		infoComuna = infoComunas[comuna];
	}

	// actualizar información por comuna
	[12, 13, 14, 15].forEach((tipo) => {
		if (info[tipo] !== null) {
			const total = parseInt(info[tipo], 10) + (
				tiposEventos[tipo] in infoComuna ?
					infoComuna[tiposEventos[tipo]] :
					0
			);
			infoComuna[tiposEventos[tipo]] = total;
		}
	});
	infoComunas[comuna] = infoComuna;
});

// añadir capa con la definicion de los barrios en el mapa
const countyStyle = (feature) => {
	const comuna = parseInt(feature.properties.comuna, 10);
	return {
		fillColor: coloresComuna[comuna],
		fillOpacity: 0.85,
		opacity: 1,
		color: '#000',
		weight: 0.5,
	};
};

const showPopup = (feature, layer) => {
	const { comuna } = feature.properties;
	const info = infoComunas[comuna];
	let content = `<h4>${feature.properties.barrio}</h4>
					<ul>
					<li><strong>Comuna:</strong> ${comuna}</li>`;

	if (info !== undefined) {
		Object.keys(icons).forEach((tipo) => {
			if (Number.isInteger(info[tipo]) && info[tipo] !== 0) {
				content += `<li>${icons[tipo]} <strong>${tipo}</strong>: ${info[tipo]}</li>`;
			}
		});
	}
	content += '</ul>';
	layer.bindPopup(content);
};

L.geoJSON(countiesJson, {
	style: countyStyle,
	onEachFeature: showPopup,
}).addTo(map);
