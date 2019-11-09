var svg = d3.select("svg"),
  margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "toolTip");

var y = d3
    .scaleBand()
    .rangeRound([0, height])
    .padding(0.1),
  x = d3.scaleLinear().rangeRound([0, width]);

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

d3.json("data.json", function(error, data) {
  if (error) throw error;

  y.domain(
    data.map(function(d) {
      return d.txt;
    })
  );
  x.domain([
    0,
    10,
  ]);


  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  g.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
  
  g.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand())
      .on("mouseenter", function(d) {
        var str = "<img class=\"image\" src=\"" + d.img + "\"/>";
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 370 + "px")
          .style("display", "inline-block")
          .html(str)
      })
      .on("mouseleave", function(d) {
        tooltip.style("display", "none");
      });
});

function type(d) {
  d.value = +d.value;
  return d;
}

