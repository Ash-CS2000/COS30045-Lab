function ScatterPlot(){
    var w = 300;
    var h = 350;
    var padding = 20;

    var dataset=[
                [50,10],
                [200,300],
                [100,180],
                [200,150],
                [250,120],
                [150,100],
                [100,67],
                [77,100],
                [66,55],
                [44,95]
                ];

    var svg=d3.select("#scatterplot")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var Xscale = d3.scaleLinear()
                .domain([0 , 300]) // Input range (data range)
                .range([0, w]); // Output range (pixel range)

    
    
    var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(Xscale);

    svg.append("g")
        .attr("transform", "translate(" + 30 + "," + (h - padding) + ")")
        //.attr("transform", "translate(0, " + (h - padding) + ") ")
        .call(xAxis);


    var Yscale = d3.scaleLinear()
                .domain([0, 300])
                .range([h, 0]);
    
    var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(Yscale);

    svg.append("g")
        .attr("transform", "translate(" + 30 + "," + (-padding) + ")")
        .call(yAxis);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d,i){
            return d[0];
        })
        .attr("cy", function(d,i){
            return d[1];
        })
        .attr("r", 5)
        .attr("fill", "blue");


    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d[0] + "," + d[1];
        })
        .attr("x", function(d){
            return d[0] + 10;
        })
        .attr("y",function(d){
            return d[1];
        });
}

window.onload = ScatterPlot();