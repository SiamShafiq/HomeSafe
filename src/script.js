var mapOptions ={
    zoomControl:false
}

var accessToken = "pk.eyJ1Ijoic2lhbXNoYWZpcTciLCJhIjoiY2plbGo4ano2NDg0YzJxcWVkZmtyZmg1MyJ9.fgQjadXw1yk-M8ZhY2pFAg";
console.log("This script is running");

var map = L.map('map', mapOptions).setView([45.508888, -73.561668], 7);


var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

// switch light / dark mode on toggle 
function toggleCheck() {
	if(document.getElementById("myCheckbox").checked === true){
		document.getElementById("box-id").checked==true
		$(".box").addClass("blackBG");
		$(".label").addClass("greentxt");
		$(".button").addClass("blackBG");
		$(".button").addClass("greentxt");
        $(".panel-heading").addClass("greentxt");
        $(".panel-heading").addClass("blackBG");
        $(".panel").addClass("greentxt");
        $(".panel").addClass("blackBG");
	var Jawg_Matrix = L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=YGO7Or8lNnEeYrokBZQ4x1HGDtUe6tJ3rnquOMHbxOfBjyowxJWxEg6cWp7HTY7R', {
		attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: 0,
		maxZoom: 22,
		subdomains: 'abcd',
		accessToken: '<your accessToken>'
	}).addTo(map);

	} else {
		$(".box").removeClass("blackBG");
		$(".label").removeClass("greentxt");
		$(".button").removeClass("blackBG");
		$(".button").removeClass("greentxt");
        $(".panel-heading").removeClass("greentxt");
        $(".panel-heading").removeClass("blackBG");
        $(".panel").removeClass("greentxt");
        $(".panel").removeClass("blackBG");
		var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			subdomains: 'abcd',
			minZoom: 0,
			maxZoom: 20,
			ext: 'png'
		}).addTo(map);
	}
  }

// function to open news API
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function newsFunction() {
	var x = document.getElementById('news');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}


// var Jawg_Matrix = L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=YGO7Or8lNnEeYrokBZQ4x1HGDtUe6tJ3rnquOMHbxOfBjyowxJWxEg6cWp7HTY7R', {
// 	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	minZoom: 0,
// 	maxZoom: 22,
// 	subdomains: 'abcd',
// 	accessToken: '<your accessToken>'
// }).addTo(map);

var popup = L.popup();
var start;
var end;

async function getRoute(start, end) {
    const query = await fetch(
        "https://api.mapbox.com/directions/v5/mapbox/walking/" + start.lng + "," + start.lat + ";" + end.lng + "," + end.lat + "?steps=true&geometries=geojson&access_token=" + accessToken,
      { method: 'GET' }
    );

    const json = await query.json();
    const data = json.routes[0];

    
    console.log(data);

    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };

    L.geoJSON(geojson, {
        onEachFeature: function(feature, layer){
            layer.myTag = "myRoute"
        }
    }).addTo(map);
    

    // if the route already exists on the map, we'll reset it using setData


    // if (L.geoJSON('route')) {
    //   L.geoJSON('route').addTo(map);
    // }
    // // otherwise, we'll make a new request
    // else {
    //   map.addLayer({
    //     id: 'route',
    //     type: 'line',
    //     source: {
    //       type: 'geojson',
    //       data: geojson
    //     },
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#3887be',
    //       'line-width': 5,
    //       'line-opacity': 0.75
    //     }
    //   });
    // }
    // add turn instructions here at the end
  }

var removeRoute = function(){
    map.eachLayer(function (layer) {
        if(layer.myTag && layer.myTag === "myRoute"){
            map.removeLayer(layer)
        }
    });
}

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);

	if(typeof start === 'undefined'){
		start = e.latlng;
	}else if(typeof end === 'undefined'){
		end = e.latlng;
	}else{
		end = e.latlng;
	}

	if(typeof start != 'undefined' & typeof end != 'undefined'){
		removeRoute();
		getRoute(start, end);
	}
}

// var mymap = L.map('mapid').setView([50.27264, 7.26469], 13);

//     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
//             .addTo(map);

    // L.leafletControlRoutingtoaddress({
    //     position: 'topright',
    //     router: 'osrm',
    //     token: '',
    //     placeholder: 'Please insert your address here.',
    //     errormessage: 'Address not valid.',
    //     distance: 'Entfernung:',
    //     duration: 'Fahrzeit',
    //     target: 'Koblenz, Rheinland-Pfalz, Deutschland',
    //     requesterror: '"Too Many Requests" or "Not Authorized - Invalid Token"'

    // }).addTo(map);

map.on('click', onMapClick);

// News API