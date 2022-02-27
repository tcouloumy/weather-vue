<!-- WeatherDetails.vue -->
<!-- Display a complete weather forcecast retrieve on google api based one the route params -->

<template>
  <div class="rain-graph">
    <svg
      width="100%"
      height="200px"
    >
      <g>
        <rect
          v-for="(bar, index) in rainBars"
          :key="index"
          :class="bar.class"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
        />
      </g>
    </svg>
  </div>
  <!--<div class="rain-graph" />-->
</template>

<script>
import * as d3 from 'd3';
import { format } from 'date-fns';

export default {
  name: 'WeatherDetails',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
  computed: {
    viewBox() {
      return '0 0 100% 200px';
    },

    rainBars() {
      const margin = {
        top: 10,
        right: 0,
        bottom: 30,
        left: 0
      };

      const width = 960 - margin.left - margin.right;
      const height = 200 - margin.top - margin.bottom;

      const x = d3.scaleLinear()
        .domain([0, this.data.length])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, 1])
        .range([0, height]);

      return this.data.map((element, index) => ({
        class: 'hour',
        x: x(index),
        width: x(index + 1) - x(index),
        y: y(1 - element.pop),
        height: height - y(1 - element.pop)
      }));
    }
  },
  mounted() {
    console.log(this.data);
    console.log(this.rainBars);

    const margin = {
      top: 10,
      right: 0,
      bottom: 30,
      left: 0
    };

    const width = this.$el.offsetWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select('.rain-graph svg');

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
      );

    /*
    svg.selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'hour-border')
      .attr('x', (d, i) => x(i))
      .attr('width', (d, i) => x(i + 1) - x(i))
      .attr('y', (d) => y(1 - d.pop))
      .attr('height', '2');*/
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

      rect {
        &.hour {
          fill: rgba(200, 213, 228, 0.8);
        }
        &.hour-border {
          fill: #546778;
        }
      }
    }
}

</style>
