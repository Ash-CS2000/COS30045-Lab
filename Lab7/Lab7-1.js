function init(){
    var w = 600;
    var h = 400;
    var padding = 60;

    var dataset 

    //get data from csv file
    d3.csv("Lab7-1.csv", function(d){
        return {
            date: new Date (+d.year, d.month - 1),          //get date 
            number: +d.number                               //get number value
        };
    }).then (function(data){
        dataset = data;
        lineChart(dataset);
    })
    console.table (dataset, ["date", "number"]);

    function lineChart(){
        xScale = d3.scaleTime()
        .domain([   //domain for xcale
            d3.min(dataset, function(d){return d.date; }),
            d3.max(dataset, function(d){return d.date; })
        ])
        .range([padding, w - padding]);

        yScale = d3.scaleLinear()           //draw yScale
                .domain([0, d3.max(dataset, function(d) {return d.number; })
                ])
                .range([h - padding, padding]);

        line = d3.line()                //draw line
                .x(function(d) {return xScale(d.date); })
                .y(function(d) {return yScale(d.number); });

        area = d3.area()                //draw area for data 
                .x(function(d) { return xScale(d.date); })
                
                //base line foe area shape
                .y0(h - padding)
                .y1(function(d) {return yScale(d.number); })

        var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

        svg.append("path")
                .datum(dataset)
                .attr("class", "line")
                .attr("d", area);

        svg.append("line")              //draw middle line to distinguish
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            //end of line
            .attr("x2", w)
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7 )
            .text("Half a million unemployed");


        //xasis
        var xAxis = d3.axisBottom()
                        .ticks(10)
                        .scale(xScale);

        svg.append("g")
            .attr("transform", "translate(" + 0 + "," + (h - padding) + ")")
            .call(xAxis);

        //yAxis
        var yAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        svg.append("g")
            .attr("transform", "translate(" + padding + "," + (0) + ")")
            .call(yAxis);

    }

    

}

window.onload = init;
