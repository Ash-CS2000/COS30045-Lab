function init(){
    d3.select("#Add")
            .on("click", function (){
                Add();
            });
        
        d3.select("#Remove")
            .on("click", function (){
                remove();
            });

        d3.select("#sort")
            .on("click", function(){
                Sort();
            })
        

        var dataset = [20, 15, 24, 26, 13, 9, 7, 17, 8, 14, 20];
        var w =300;
        var h=200;
        var maxValues = 25;
        var padding = 20;

            //function to add new data bar
        function Add(){
            var newNumber = Math.floor(Math.random()*maxValues);
            dataset.push(newNumber);

            // Update yScale domain based on the new data
            yScale.domain([0, d3.max(dataset)]);
            xScale.domain(d3.range(dataset.length));

    

            // Update bars
            var bars = svg.selectAll("rect")
                .data(dataset)
                

            bars.enter()
                .append("rect")
                .attr("fill", "rgb(150, 200, 330)")
                .on("mouseover",function(event, d){                     //change color in hover stage
                d3.select(this)
                    .attr("fill", "orange")
                    .transition();
                //get x and y position
                var xPosition = parseFloat(d3.select(this).attr("x"));
                var yPosition = parseFloat(d3.select(this).attr("y"));

                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition + 5)
                    .attr("y", yPosition + 15)
                    .text(d); 
                })
                .on("mouseout",function(){                              //change color back to original
                d3.select(this)
                    .attr("fill", "rgb(150,200,300)");
                d3.select("#tooltip").remove();                         //remove the bar
                })
                .attr("x",w)
                .attr("y",function(d){
                    return h - yScale(d);
                })
                .merge(bars)
                .transition()
                .duration(500)
                .attr("x", function(d,i){
                    return xScale(i)
                })
                .attr("y", function(d){
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d){
                    return yScale(d) - padding;
                })
        }

        //function to remove bar from chart
        function remove(){

            dataset.shift();

            yScale.domain([0, d3.max(dataset)]);
            xScale.domain(d3.range(dataset.length));

            // Update bars
            var bars = svg.selectAll("rect")
                .data(dataset)      

            bars.exit()
                .transition()
                .duration(500)
                .attr("x",w)
                .remove();
        }

        // sort
        let sortOrder = true; //set sortorder first 
        function Sort(){
            sortOrder = !sortOrder; //toggle the sorting order

            svg.selectAll("rect")
                .sort(function(a,b){
                    if(sortOrder){
                        return d3.ascending(a,b);
                    }
                    else {
                        return d3.descending(a,b);
                    }
                    
                })
                .attr("x",function(d,i){
                    return xScale(i); //update x position of each rect
                });
        };

    
        var xScale = d3.scaleBand()
                        .domain(d3.range(dataset.length))
                        .rangeRound([padding , w])
                        .paddingInner(0.05);

        var yScale = d3.scaleLinear()
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
            .on("mouseover",function(event, d){ 
                d3.select(this)                     //hover the pointer and change color
                    .attr("fill", "orange")
                    .transition();
                
                var xPosition = parseFloat(d3.select(this).attr("x"));
                var yPosition = parseFloat(d3.select(this).attr("y"));

                svg.append("text")                  //add text while in hover
                    .attr("id", "tooltip")
                    .attr("x", xPosition + 5)
                    .attr("y", yPosition + 15)
                    .text(d); 
            })
            .on("mouseout",function(){
                d3.select(this)
                    .attr("fill", "rgb(150,200,300)");
                d3.select("#tooltip").remove();
            })
            .attr("x", function(d, i) {
                return xScale(i);  // Use xScale for x-position
            })
            .attr("y", function(d) {
                return yScale(d);  // Use yScale for y-position
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return h - yScale(d) - padding;
            });
        

}
window.onload = init;