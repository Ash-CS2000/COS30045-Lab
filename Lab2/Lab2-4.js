function init(){

var w = 500;
var h = 200;
var barPadding = 1;

let svg=d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

d3.csv("Lab2-4.csv").then (function(data){
    console.log(data);
    cobra_amount = data;
    BarChart(cobra_amount);
    
});

function BarChart(){
    

    svg.selectAll("rect")
        .data(cobra_amount)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return i * (w/cobra_amount.length);
        })
        .attr("y", function(d){
            return h - (d.Cobra);
        })
        .attr("width", function(d){
            return (w/cobra_amount.length-barPadding);
        })
        .attr("height", function(d){
            return d.Cobra;
        })
        .attr("fill", function(d){
            if(d.Cobra>25){
                return "red";
            }
            else{
                return "green";
            }
        });

    svg.selectAll("text")
        .data(cobra_amount)
        .enter()
        .append("text")
        .text(function(d){
            return d.Cobra;
        })
        .attr("fill", "black")
        .attr("x", function(d, i){
            return i * (w/cobra_amount.length) + 16;
        })
        .attr("y",function(d){
            return h - (d.Cobra);
        });
    
};
}

window.onload = init;