var svg = d3.select("svg"),
  margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "toolTip");

var x = d3
    .scaleBand()
    .rangeRound([0, width])
    .padding(0.1),
  y = d3.scaleLinear().rangeRound([height, 0]);

var colours = d3.scaleOrdinal().range(["#6F257F", "#CA0D59"]);

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(error, data) {
  if (error) throw error;

  x.domain(
    data.map(function(d) {
      return d.txt;
    })
  );
  y.domain([
    0,
    1,
  ]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickSizeInner([-width])
    )
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .attr("fill", "#5D6971");

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return x(d.txt);
    })
    .attr("y", function(d) {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return height - y(d.value);
    })
    .attr("fill", function(d) {
      return colours(d.txt);
    })
    .on("mouseenter", function(d) {
      var str = "<img class=\"image\" src=\"" + d.img + "\"/>";
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(str)
    })
    .on("mouseleave", function(d) {
      tooltip.style("display", "none");
    });
});
