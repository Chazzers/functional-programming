# functional-programming
Visualisation of data through the database of the 'NMVW' and the JavaScript library D3.

## Concept - Datavisualisation of the collection of Japanese weapons from the NMVW Database

This app visualises all of the weapons of the Japanese collection of the database in a bubblechart. The app uses the JavaScript library D3 and the database of the "Nationaal Museum Van Wereldculturen" (NMVW).

![Bubble chart - Japanese Weapons](https://user-images.githubusercontent.com/33430669/68870651-7f44e180-06fb-11ea-8562-2575ddc51b53.png)

Source: [Nickelback](https://github.com/hubot-scripts/hubot-look-at-this-graph/blob/master/README.md)

## Data

To get data from the NMVW database i had to make use of SPARQL. SPARQL (SPARQL Protocol And RDF Query Language) is a RDF query language that is used to get RDF-based data through queries.

Source: [Wikipedia SPARQL](https://nl.wikipedia.org › wiki › SPARQL)

```JavaScript
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
```

## Getting started

### Installation

This project makes use of Rollup to build the app. If you want to run the app you will have to install Rollup globally like this:

`npm install rollup -g`

To install the project use npm install.

`npm install`

To create a development environment use:

`npm run dev`

To build for production use:

`npm run build`

## Wiki

Click [here](https://github.com/Chazzers/functional-programming/wiki) to read the proces behind creating this app.

## Acknowledgments

* The NMVW
* D3 - JavaScript library
* [Simple Bubble Chart D3 v4 - example](https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168)
* [Tutorial on D3 Basics and Circle Packing (Heirarchical Bubble Charts)](https://observablehq.com/@johnhaldeman/tutorial-on-d3-basics-and-circle-packing-heirarchical-bubb)
* [Clean data assignment](https://github.com/Chazzers/functional-programming/tree/master/clean-data-assignment)
* Martijn Keesmaat voor de motivatie!!! Het kon niet zonder hem
* Marc Kunst voor de SPARQL query
