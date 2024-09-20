function ScatterPlot(){
    var w = 300;
    var h = 350;
    var padding = 50;

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

    
    //xasis
    var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(Xscale);

    svg.append("g")
        .attr("transform", "translate(" + 30 + "," + (h - padding) + ")")
        //.attr("transform", "translate(0, " + (h - padding) + ") ")
        .call(xAxis);

    //yaxis
    var Yscale = d3.scaleLinear()
                .domain([0, 300])
                .range([h, 0]);
    
    var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(Yscale);

    // X-axis label
    svg.append("text")
        .attr("text-anchor", "end") // Align text at the end
        .attr("x", w / 2)           // Center the label horizontally
        .attr("y", h - 20)           // Position near the bottom of the SVG
        .text("Tree Age (year)");   // Text for x-axis

    // Y-axis label
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")   // Rotate the label for vertical positioning
        .attr("y", padding - 41)                      // Adjust vertical position of the label
        .attr("x", -h / 2)                  // Center the label on the y-axis
        .text("Tree Height (cm)");          // Text for y-axis

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

        //text
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