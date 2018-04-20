import { XMLHttpRequest } from 'xmlhttprequest';

function loadJSON(path, callback) {
	const xobj = new XMLHttpRequest();
	xobj.overrideMimeType('application/json');
	xobj.open('GET', path, true);
	xobj.onreadystatechange = () => {
		if (xobj.readyState === 4 && xobj.status === 200) {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

function range(start, end) {
	Array.from(Array(end + 1).keys()).slice(start);
}

export default { loadJSON, range };
