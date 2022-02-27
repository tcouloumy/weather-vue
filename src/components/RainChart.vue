<!-- WeatherDetails.vue -->
<!-- Display a complete weather forcecast retrieve on google api based one the route params -->

<template>
  <div class="rain-graph" />
</template>

<script>
import * as d3 from 'd3';
import { format } from 'date-fns';

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

    const x = d3.scaleLinear()
      .domain([0, this.data.length])
      .range([0, width]);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3.axisBottom(x)
          .tickFormat((d, i) => {
            const date = new Date();
            date.setHours(date.getHours() + ((date.getMinutes() > 30) ? i + 1 : i));
            date.setMinutes(0);

            return format(date, 'HH:mm');
          })
          .tickSizeOuter(0)
      );

    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([0, height]);

    svg.selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'hour')
      .attr('x', (d, i) => x(i))
      .attr('width', (d, i) => x(i + 1) - x(i))
      .attr('y', (d) => y(1 - d.pop))
      .attr('height', (d) => height - y(1 - d.pop));
  }
};

</script>

<style lang="scss" scoped>

.rain-graph {
    ::v-deep {
      .x-axis {
        .domain,
        .tick:first-of-type,
        .tick:last-of-type,
        .tick line {
          display: none;
        }
      }

      rect.hour {
        fill: rgba(200, 213, 228, 0.8);
      }
    }
}

</style>
