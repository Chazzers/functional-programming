import { csv } from 'd3';
csv("../data/enquete.csv")
	.then(data => makeArray(data))
	.then(data => filterUndefined(data))
	.then(data => filterKleurNaam(data))
	.then(data => console.log(addHashtag(data)));

	function makeArray(items) {
		console.log(items);
		return items.map(item => item["Kleur haar (HEX code)"].toUpperCase());
	}
	function filterUndefined(items) {
		console.log(items);
		return items.filter(item => item !== '' && item !== "0");
	}
	function filterKleurNaam(items) {
		console.log(items);
		return items.filter(item => !item.includes("BLOND") && !item.includes("BRUIN"))
	}
	function addHashtag(items) {
		return items.map(item => item[0]!== "#" ? "#" + item : item );
	}
