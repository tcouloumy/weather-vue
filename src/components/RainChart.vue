<!-- WeatherDetails.vue -->
<!-- Display a complete weather forcecast retrieve on google api based one the route params -->

<template>
  <div class="rain-graph" />
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'WeatherDetails',
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
  },
  mounted() {
    console.log(this.data);
    //const width = this.$el.offsetWidth;

    var margin = {top: 10, right: 0, bottom: 30, left: 0},
    width = this.$el.offsetWidth - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".rain-graph")
  .append("svg")
    .attr("width", '100%')
    .attr("height", height + margin.top + margin.bottom)

    var x = d3.scaleLinear()
      .domain([0, this.data.length])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([0, height]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    console.log(this.data);

    svg.selectAll(".bar")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, index) => x(index))
      .attr('width', (d, i) => x(i + 1) - x(i))
      .attr("y", d => y(1 - d.pop))
      .attr("height", (d) => height - y(1 - d.pop));
  }
};

</script>

<style lang="scss" scoped>

</style>
