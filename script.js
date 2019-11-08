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

d3.json("data.json", function(error, data) {
  if (error) throw error;

  y.domain(
    data.map(function(d) {
      return d.class_label;
    })
  );
  x.domain([
    -10,
    10,
  ]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(1));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(
      d3
        .axisLeft(y)
    )

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function(d) {
      return y(d.txt);
    })
    .attr("x2", function(d) {
      return x(d.diff_normed_class_mean);
    })
    .attr("height", y.bandwidth())
    .attr("width", function(d) {
      return width - x(d.diff_normed_class_mean);
    })
    .attr("fill", function(d) {
      return "lightblue"
    })
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