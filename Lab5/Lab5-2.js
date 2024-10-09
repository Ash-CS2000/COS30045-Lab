function init(){

        d3.select("#chartbutton")
            .on("click", function (){
                updateChart();
            });

        // function to update transition
        d3.select("#transition1")
            .on("click", function() {
                updateChart(d3.easeElasticOut);
        });

        // function to update transition
        d3.select("#transition2")
            .on("click", function () {
                updateChart(d3.easeCircleOut);
        });
        

        var dataset = [20, 15, 24, 26, 13, 9, 7, 17, 8, 14, 20];
        var w =300;
        var h=200;
        var maxValues = 25;
        var padding = 20;

        
            
        function updateChart(easeFunc){
            var numValues = dataset.length;
            
            //create random dataset
            dataset = [];
                for (let i=0; i<numValues; i++){
                    let newNumber = Math.floor(Math.random() * maxValues);
                    dataset.push(newNumber);
                }

            // Update yScale and xScale domain based on the new data
            yScale.domain([0, d3.max(dataset)]);
            xScale.domain(d3.range(dataset.length));

            // Update bars
            

            if(easeFunc){
                svg.selectAll("rect")
                    .data(dataset)
                    .transition()
                    .delay(function(d,i){
                        return i/dataset.length * 100;
                    })
                    .duration(2000)
                    .ease(easeFunc)
                    .attr("y", function(d) {
                         return yScale(d);
                    })
                   .attr("height", function(d) {
                         return h - yScale(d) - padding;
               });
            }

            else {
                svg.selectAll("rect")
                    .data(dataset)
                    .attr("y", function(d) {
                    return yScale(d);
                    })
                    .attr("height", function(d) {
                    return h - yScale(d) - padding;
                    });
            }
                

            // Update text labels
            svg.selectAll("text")
                .data(dataset)
                .text(function(d) {
                    return d;
                })
                .attr("y", function(d) {
                    return yScale(d) + 15;
                });
            
        }


        function updateTransition(easeFunc){
            svg.selectAll("rect")
            .transition() // add transition
            .duration(2000)
            .ease(easeFunc)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d) - padding;
            });
        }

        var xScale = d3.scaleBand()                             //create xScale on chart
                        .domain(d3.range(dataset.length))
                        .rangeRound([padding , w])
                        .paddingInner(0.05);

        var yScale = d3.scaleLinear()                           //create yScale on chart
                        .domain([0, d3.max(dataset)])
                        .rangeRound([h - padding , 0 ])

        var svg = d3.select("body")
                    .append("svg")
                    .attr("width",w)
                    .attr("height", h + 30);

                    
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("fill", "rgb(150, 200, 330)")
            .attr("x", function(d, i) {
                return xScale(i);  // Use xScale for x-position
            })
            .attr("y", function(d) {
                return yScale(d);  // Use yScale for y-position
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return h - yScale(d) - padding;
            });;

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d){
                return d;
            })
            .attr("fill", "black")
            .attr("x", function(d,i){
                return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y",function(d){
                return yScale(d) + 15;
            })
            .attr("text-anchor", "middle");;

            
            // X Axis
            var xAxis = d3.axisBottom(xScale);
            svg.append("g")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

            // Y Axis
            var yAxis = d3.axisLeft(yScale);
            svg.append("g")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis);

            // X Axis Label
            svg.append("text")
                .attr("text-anchor", "middle")
                .attr("x", w / 2)
                .attr("y", h + 20)
                .text("Category");

            // Y Axis Label
            svg.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("x", -h / 2)
                .attr("y", 0)
                .text("Value");

}
window.onload = init;