// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top}`);

// Import Data
d3.csv("assets/data/data.csv").then(function(lifestyleData) {
    // Parse Data/Cast as numbers
    lifestyleData.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(lifestyleData, d => d.income), d3.max(lifestyleData, d => d.income)])
        .range([0, width]);

    var  yLinearScale = d3.scaleLinear()
        .domain([d3.min(lifestyleData, d => d.obesity), d3.max(lifestyleData, d => d.obesity)])
        .range([height, 0]);

    // Create axis function
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    // Create Circles
    var blubberGroup = chartGroup.selectAll("cirlce")
    .data(lifestyleData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "#99e6ff")
    .attr("opacity", ".7");

    // Append Text in Circle
    blubberGroup.selectAll()
    .data(lifestyleData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.income))
    .attr("y", d => yLinearScale(d.obesity))
    .text( n => n.abbr)
    .attr("font-size", "5px")

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - margin.left + 40)
        .attr("y", 0 - (height /2) + 40)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity Tendency ");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2.5}, ${height +margin.top+ 40} )`)
        .attr("class", "axisText")
        .text("Income Effect");
}).catch(function(error) {
    console.log(error);
});
