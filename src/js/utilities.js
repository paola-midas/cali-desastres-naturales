import { XMLHttpRequest } from 'xmlhttprequest';

export default function loadJSON(path, callback) {
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
