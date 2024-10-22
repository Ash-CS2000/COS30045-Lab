function init(){

    var w = 300;
    var h = 300;
    var padding = 50;

    var  dataset = [
        {apples: 5, oranges: 10, grapes: 22 },
        {apples: 4, oranges: 12, grapes: 28 },
        {apples: 2, oranges: 19, grapes: 32 },
        {apples: 7, oranges: 23, grapes: 35 },
        {apples: 23, oranges: 17, grapes: 43},
    ];

    var keys = ["apples", "oranges", "grapes"];

    var series = d3.stack()
                    .keys(keys)(dataset);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg=d3.select("#chart")
                .append("svg")
                .attr("width", w + 150)             //set the width wider to display legend
                .attr("height", h);

    var yScale=d3.scaleLinear()                         //draw xScale
                .domain([0, d3.max(dataset, function(d){
                    return d.apples + d.oranges + d.grapes;
                })
                ])
                .range([h,0]);

    var xScale = d3.scaleBand()                     //draw yScale
               .domain(d3.range(dataset.length))
               .range([padding, w - padding])
               .padding(0.1);

    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d,i){
                        return color(i);
                    })

                groups.selectAll("rect")        //stack all the rects
                        .data(function(d) {
                            return d;
                        })
                        .enter()
                        .append("rect")
                        .attr("x", function(d,i){
                            return xScale(i);
                        })
                        .attr("y", function(d,i){
                            return yScale(d[1]);
                        })
                        .attr("height", function(d){
                            return yScale(d[0]) - yScale(d[1]);
                        })
                        .attr("width", xScale.bandwidth());


                        // Adding the legend
    var legend = svg.selectAll(".legend")
                    .data(keys)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
                        return "translate(" + (w + 50) + "," + (i * 20 + 50) + ")";
                    });

                legend.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 18)          //legend width
                    .attr("height", 18)         //legend height
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                legend.append("text")
                    .attr("x", 25)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .text(function (d) {
                        return d;
                    });

    

}

window.onload = init;