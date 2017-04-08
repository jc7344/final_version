
// instantiate the map object
var map = L.map('mapContainer',{
  scrollWheelZoom: false
}).setView([23.787819, 86.422282], 15);

//add a dark basemap from carto's free basemaps
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

//Create a custom icon

    var firefoxIcon = L.icon({
        iconUrl: 'http://freeiconbox.com/icon/256/24022.png',
        iconSize: [18, 18],
        iconColor: 'steelblue', 

        // size of the icon
        }); 

    var Junction = L.icon({
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/controls-and-navigation-arrows-4/24/154-512.png',
        iconSize: [18, 18],
        iconColor: 'steelblue', 

        // size of the icon
        });   


$.getJSON('data/data.geojson', function(jqueryData) {



  L.geoJson(communityDistricts).addTo(map);

  //add geojson data from another js file
  L.geoJson(myData, {
    style: function (feature) {
      // generate different color objects based on feature properties

      //var colorsArray = ['red', 'green', 'blue'];
      var customColor;

      if(feature.properties.value == 1) {
        customColor = 'red';
        // customColor = colorsArray[0];
      }

      return {
        color: customColor,
        fillColor: customColor,
        weight: 2,
      };
    }
  }).addTo(map);

var manhattanCrew = [
  {
    icon_url: 'https://github.com/jc7344/final_project/blob/master/IMG_7038.JPG?raw=true',
    coord: [23.788906, 86.420179],
    zoom:1
  },
  {
    icon_url: 'https://github.com/jc7344/final_project/blob/master/Screen%20Shot%202017-04-03%20at%2010.20.58%20PM.png?raw=true',
    coord: [23.787370, 86.423961],
    zoom:1
  },
]

var brooklynCrew = [
  {
    name: 'Birsa Munda Chowk',
    coord: [23.786720, 86.423799],
  },
{
    name: 'Joraphatak Chowk',
    coord: [23.788323, 86.420084],
  },
]

// create an empty layerGroup
var manhattanLayerGroup = L.layerGroup();

manhattanCrew.forEach(function(data) {
  var thisMarker = L.marker(data.coord, {
    icon: firefoxIcon,
    color:'steelblue',
    fillOpacity: .9,
  });
//bind popup to picture link 
  thisMarker.bindPopup( "<img src=" + data.icon_url + "/> " ,{
    maxWidth: "auto",
    autoPan:true
  });

  // add the marker to the layergroup
  manhattanLayerGroup.addLayer(thisMarker);
  
});

var brooklynLayerGroup = L.layerGroup();

brooklynCrew.forEach(function(data) {
  var thisOtherMarker = L.marker(data.coord, {
    icon: Junction,
    color:'steelblue',
    fillOpacity: .9,
  })
  //set style for popup contetnt
    .bindPopup("<h3 style=’color:#de2d26’>Dhanbad Roads Project</h3>" + "<h4 style='color:#636363'>Junction:" + data.name +"</h4>")
    .addTo(map)


    brooklynLayerGroup.addLayer(thisOtherMarker);
});

// finally, add the fully populated layergroup to the map
manhattanLayerGroup.addTo(map);
brooklynLayerGroup.addTo(map);

// create an object with the two layerGroups in it, which we can pass into L.control.group

var boroughs = {
  "Pictures": manhattanLayerGroup,
  "Junctions": brooklynLayerGroup,
}

L.control.layers(null, boroughs, {
  collapsed: true
}).addTo(map);

// begin event handlers for buttons

$('.study-area').on('click', function() {
  // alert('You clicked Al!')
  window.location = 'index.html#top';
});

$('.robert-favorite').on('click', function() {
  // alert('You clicked Al!')
  window.location = 'index.html#land';
});

$('.fernanda-favorite').on('click', function() {
  // alert('You clicked Al!')
  window.location = 'index.html#foot';
});

// reset view
$('.reset').on('click', function() {
  // alert('You clicked Al!')
  window.location = 'index.html#jumbo';
  
});

 
}) // this is the end of the $.getJSON callback

var map2 = L.map('map2', {
  scrollWheelZoom: false
}).setView([23.787819, 86.422282], 11);

// add an OpenStreetMap tile layer
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

var layer = L.geoJson(myData2).addTo(map2);
 //color selector for land use pattern
    function getColor(d) {
         return d == 1   ? '#fec44f' :
                d == 2   ? '#41ab5d' :
                d == 3   ? '#e7298a' :
                d == 4   ? '#636363' :
                           '#F2F0F7' ;
    }

    //fill color for geojson based on the feature
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.value),
            weight: 1,
            opacity: 1,
            color: getColor(feature.properties.value),
            fillOpacity: 0.8
        };
    }
//Adding highlight/interaction 
var geojson = L.geoJson(myData2, {style: style}).addTo(map2);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();

    }
}

//mousout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//zoom to feature on click of municipality
function zoomToFeature(e) {
    map2.fitBounds(e.target.getBounds());
}

//listen for the functions so that on these actions it highlights.
function onEachFeature(feature,layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}
geojson = L.geoJson(myData2, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map2);

var info = L.control();

//Adding control

info.onAdd = function (map2) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
       this._div.innerHTML = '<h6>Dhanbad Land Use Patterns</h6>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.type + '% of existing land use'
        : 'Hover over an colored area');
};

info.addTo(map2);

//Adding legend 

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map2) {

  var div = L.DomUtil.create('div', 'info legend');
//create legend and a loop that connects land use categories and colors
    grades = [1,2,3,4],
    categories = ['Residential','Agricultural','Institutional','Mining'];

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
        '<i class="circle" style="background:' + getColor(grades[i]) + '"></i> ' +
         (categories[i] ? categories[i] + '<br>' : '+');
    }

    return div;


};

legend.addTo(map2);

const GRAPH = document.getElementById("lineChart");
//console.log(GRAPH);
//Create line chart
let lineChart = new Chart(GRAPH,{
 type:'line',
 title: {
            display: true,
            text: "Registration of pasanger Vehicles in Dhanbad District",
        },
 data: {
    labels: ["2003-2004", "2005-2006", "2007-2008", "2009-2010", "2011-2012", "2013-2014", "2014-2015"],
    datasets: [
        {
            label: "Two Wheeler",
            fontSize: 18,
            fill: false,
            lineTension: 0.2,
            backgroundColor: "#ef6548",
            borderColor: "#d7301f",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#d7301f",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#d7301f",
            pointHoverBorderColor: "#d7301f",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 5,
            data: [13641, 17996, 20576, 24509, 18107, 17651, 22864, 30298, 31906, 32445, 33717, 33717],
            spanGaps: false,
            graphTitle : "Sample ChartNew.js"
        },

        {
            label: "Car/Van/Jeep",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#225ea8",
            borderColor: "#253494",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#253494",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#253494",
            pointHoverBorderColor: "#253494",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 5,
            data: [1760, 1987, 2599, 2644, 2287, 3304, 4088, 6048, 5131, 5944, 5652, 5652],
            spanGaps: false,
        },

        {
            label: "Three Wheeler",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#41ab5d",
            borderColor: "#004529",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#004529",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#004529",
            pointHoverBorderColor: "#004529",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 5,
            data: [254,348, 888, 1080, 726, 684, 1113, 1152, 1383, 1788, 1915, 1915],
            spanGaps: false,
        }

    ]
}
});
//Create pie chart 
const BARS = document.getElementById("barChart");
//console.log(GRAPH);
let barChart = new Chart(BARS,{
 type:'doughnut',
 data: {
    labels: ["%Residential", "%Agricultural", "%Institutional", "%Mining", "%Commercial", "%Mixed", "%Water Body"],
    datasets: [
        {
            label: "Points",
            backgroundColor: ['#feb24c','#41ab5d','#e7298a','#737373','#7fcdbb','#d4b9da','#084081'],
            data: [36.3, 14.7, 0.7, 46.8, 0.5, 0.2, 0.8],
        }
    ]
}
});












