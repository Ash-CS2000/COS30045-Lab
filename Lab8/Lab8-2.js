/*function init(){
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2 , h/2])
                        .scale(2450);

    var path = d3.geoPath()
                .projection(projection);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

    var color = d3.scaleQuantize()
                    .range(["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"])

    d3.csv("VIC_LGA_unemployment.csv", function(d){
                        return {
                            LGA: d.LGA, // Assuming "LGA" is the field name in the CSV
                            unemployment: +d.unemployment // Convert unemployment rate to float
                        };
                    }).then (function(data){

        d3.csv("VIC_city.csv", function(d) {
            return {
                place: d.place,
                lat: +d.lat,
                lon: +d.lon
            };
        }).then(function(cityData) {
            svg.selectAll("path")
                .enter()
                .attr("cx", function(d){
                    return projection ([d.lon, d.lat]) [0];
                })
        
                        
        d3.json("LGA_VIC.json").then (function(json){
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    var value = d.properties.unemployment;
                    return value ? color(value) : "#ccc"; // If no data, fill with grey
                })
                .attr("stroke", "#333")
                .attr("stroke-width", 0.5);


            for(var i=0; i<data.length; i++){

                //grab state name
                var dataLGA = data[i].LGA;

                //grab data value 
                var dataValue = data[i].unemployment;

                //find the corresponding state inside the GEoJson
                for (var j=0; j<json.features.length; j++){
                    var jsonLGA = json.features[j].properties.name;

                    if(dataLGA == jsonLGA){
                        //copy the data value into Json
                        json.features[j].properties.value = dataValue;

                        //stop looking through the json
                        break;
                    }
                }
    }

        color.domain([ // Set the domain for color scale
                d3.min(data, function(d) { return d.unemployment; }),
                d3.max(data, function(d) { return d.unemployment; })
            ]);

        svg.selectAll("circle")
                .data(cityData)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0]; // Longitude
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1]; // Latitude
                })
                .attr("r", 3) // Radius of the circle
                .attr("fill", "red")
                .attr("stroke", "black")
                .attr("stroke-width", 0.5)
                .append("title") // Tooltip showing city name
                .text(function(d) {
                    return d.place;
                });
        
            });
        });
    });
}*/

function init(){

    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()                   //draw the map
                        .center([145, -36.5])
                        .translate([w/2 , h/2])
                        .scale(2450);

    var path = d3.geoPath()
                .projection(projection);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

    var color = d3.scaleQuantize()      // set the colour
                    .range(["rgb(0,150,199)", "rgb(173,232,244)", "rgb(0,119,182)", "rgb(72,202,228)", "rgb(144,224,239)"])

    //get data from csv files
    d3.csv("VIC_LGA_unemployment.csv").then (function(data){

        color.domain([ // Set the domain for color scale
                d3.min(data, function(d) { return +d.unemployed; }),
                d3.max(data, function(d) { return +d.unemployed; })
            ]);


        d3.json("LGA_VIC.json").then(function(json){
            
            for (var i = 0; i < data.length; i++) {
                var dataLGA = data[i].LGA; // Name of the LGA from CSV
                var dataValue = parseFloat(data[i].unemployed); // Unemployment value from CSV

                // Loop through the GeoJSON to find the corresponding LGA
                for (var j = 0; j < json.features.length; j++) {
                    var jsonLGA = json.features[j].properties.LGA_name; // LGA name from GeoJSON
                    if (dataLGA === jsonLGA) {
                        // Assign the unemployment value to the GeoJSON
                        json.features[j].properties.unemployed = dataValue;
                      
                        break; // Stop searching once a match is found
                    }
                }
            }

            // Draw the map with the unemployment color
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    var value = d.properties.unemployed;        //set unemployed value
                    if (value) {
                        return color(value); // Color based on the unemployment value

                    } else {
                        return "#ccc"; // If no data, fill with grey
                    }
                })
                .attr("stroke", "#333")
                .attr("stroke-width", 0.5);

            // Load and draw the city data
            d3.csv("VIC_city.csv").then(function(cityData) {
                svg.selectAll("circle")
                    .data(cityData)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        return projection([+d.lon, +d.lat])[0];
                    })
                    .attr("cy", function(d) {
                        return projection([+d.lon, +d.lat])[1];
                    })
                    .attr("r", 5)
                    .style("fill", "red")
                    .style("opacity", 0.75)
                    .on("mouseover", function(event, d) {
                        // Show the tooltip with city name on hover
                        var xPosition = d3.pointer(event)[0] + 5;
                        var yPosition = d3.pointer(event)[1] - 5;
                        
                        svg.append("text")                  //show city name
                            .attr("id", "tooltip")
                            .attr("x", xPosition)
                            .attr("y", yPosition)
                            .attr("text-anchor", "middle")
                            .attr("fill", "black")
                            .text(d.place);
                    })
                    .on("mouseout", function() {
                        d3.select("#tooltip").remove(); // remove tooltips
                    });
            });
        });
    });
}

window.onload = init;