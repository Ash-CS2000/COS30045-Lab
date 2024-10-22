function init(){

    var w = 300;
    var h = 300;
    var outerRadius = w/2;
    var innerRadius = 0;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var dataset = [7, 8, 23, 12, 21, 19, 28, 30, 10];

    var svg=d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var arc = d3.arc()                  //draw arc
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    var pie = d3.pie();

    var arcs = svg.selectAll("g.arc")           //draw arc for the pie
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

                arcs.append("path")             //add color
                    .attr("fill", function(d,i){
                        return color(i);
                    })
                    .attr("d", function(d,i){
                        return arc(d,i);
                    });

                arcs.append("text")
                    .text(function(d){
                        return d.value;
                    })
                    .attr("transform", function(d){
                        return "translate(" + arc.centroid(d) + ")";
                    });


}

window.onload = init;