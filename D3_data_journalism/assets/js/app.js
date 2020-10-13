// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(lifestyleData) {
    // Parse Data/Cast as numbers
    lifestyleData.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(lifestyleData, d => d.income) - 1500, d3.max(lifestyleData, d => d.income)])
        .range([0, width]);

    var  yLinearScale = d3.scaleLinear()
        .domain([d3.min(lifestyleData, d => d.obesity) - 1, d3.max(lifestyleData, d => d.obesity) + 1])
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
    .attr("r", "12")
    .attr("fill", "#99e6ff")
    .attr("opacity", ".950");

    // Append Text in Circle
    chartGroup.selectAll()
    .data(lifestyleData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.income)-8)
    .attr("y", d => yLinearScale(d.obesity)+4)
    .text( n => n.abbr)
    .attr("font-size", "12px")

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", `translate(${-margin.left+20}, ${height/2}) rotate(-90)`)
        .attr("text-anchor", "middle")
        .attr("class", "axisText")
        .text("Obesity Tendency")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height +margin.top + 20} )`)
        .attr("class", "axisText")
        .attr("text-anchor", "middle")
        .text("Income Effect");
}).catch(function(error) {
    console.log(error);
});
