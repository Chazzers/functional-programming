import { json, nest, create, select, selectAll, pack, scaleOrdinal, schemeCategory10, hierarchy } from 'd3';
import "../styles/main.scss"

const url =
	"https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-32/sparql";

const query = `
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?cho ?placeName ?title ?type WHERE {
 <https://hdl.handle.net/20.500.11840/termmaster6917> skos:narrower* ?place .
 ?place skos:prefLabel ?placeName .

 VALUES ?type { "zwaard" "Zwaard" "boog" "Boog" "lans" "Lans" "mes" "knots" "Piek" "vechtketting" "dolk" "bijl" "strijdzeis" }


  ?cho 	dct:spatial ?place ;
        dc:title ?title ;
        dc:type ?type .
		FILTER langMatches(lang(?title), "ned") .
}
`;
const connectionString =
	url + "?query=" + encodeURIComponent(query) + "&format=json";

json(connectionString)
	.then(data => showResults(data))
	.then(data => loopData(data))
	.then(data => transformData(data))
	.then(data => visualizeData(data))
	.then(data => printData(data));


// getData();

// function getData() {
// 	return fetch(connectionString)
// 		.then(data => makeJson(data))
// 		.then(data => showResults(data))
// 		.then(data => loopData(data))
// 		.then(data => console.log(data))
// 	// 	.then(json => {
// 	// 		console.log(json);
// 	//
// 	// 		let { bindings } = json.results;
// 	//
// 	// 		for (let i = 0; i < bindings.length; i++) {
// 	// 			let item = bindings[i];
// 	// 			item.cho = item.cho.value;
// 	// 			item.placeName = item.placeName.value;
// 	// 			item.title = item.title.value;
// 	// 			item.type = item.type.value;
// 	// 		}
// 	//
// 	// 		console.log(bindings);
// 	// 		return bindings;
// 	// });
// // }
// // function loopItems() {
// //
// }

// function makeJson(data) {
// 	return data.json();
// }

function showResults(data) {
	return data.results.bindings;
}
function loopData(data) {
	return data.map(dataItem => deNestProperties(dataItem));
}
function deNestProperties(data) {
	return Object.assign({}, data, {
		cho: data.cho.value,
		placeName: data.placeName.value,
		title: data.title.value,
		type: data.type.value.toLowerCase()
	});
}
function transformData(data) {
	let newData = nest().key( d => d.type).entries(data);
	newData.forEach(item => item.key = item.key[0].toUpperCase() + item.key.slice(1));
	newData.forEach(item => item.amount = item.values.length);
	return newData;
}
function visualizeData(data) {
	console.log(data);
	const dataset = {
		children: data
	}
	console.log(dataset);
	const height = window.innerHeight - 100;
	const width = window.innerWidth - 100;

	const color = scaleOrdinal(schemeCategory10);

	const bubble = pack(dataset)
		.size([width, height])
		.padding(10);

	const svg = select("#svgcontainer")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "bubble");

	const nodes = hierarchy(dataset)
		.sum(function(d){ return d.amount });

	console.log(nodes);

	const node = svg.selectAll(".node")
		.data(bubble(nodes).descendants())
		.enter()
		.filter(function(d){
			return !d.children;
		})
		.append("g")
		.attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        node.append("title")
            .text(function(d) {
				console.log(d);
                return d.data.key + ": " + d.data.amount;
            });

        node.append("g").attr("class", "bubble-container").append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.select(".bubble-container").append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.key
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
				console.log(d.r);
				if(d.r <= 20) {
					return 0;
				} else if(d.r <= 50 && d.r >= 21){
					return d.r/3;
				} else {
                return d.r/4;
			}
            })
            .attr("fill", "white")

        // node.append("text")
        //     .attr("dy", "1.3em")
        //     .style("text-anchor", "middle")
        //     .text(function(d) {
        //         return d.data.amount;
        //     })
        //     .attr("font-family",  "Gill Sans", "Gill Sans MT")
        //     .attr("font-size", function(d){
        //         return d.r/5;
        //     })
        //     .attr("fill", "white");

        select(self.frameElement)
            .style("height", height + "px");
	}

function printData(data) {
	console.log(data);
}
