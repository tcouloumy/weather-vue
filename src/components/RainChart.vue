<!-- WeatherDetails.vue -->
<!-- Display a complete weather forcecast retrieve on google api based one the route params -->

<template>
  <div class="rain-graph">
    <svg
      :height="height"
      :width="width"
    >
      <g>
        <rect
          v-for="(bar, index) in rainBars"
          :key="index"
          class="hour"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
        />

        <rect
          v-for="(bar, index) in rainBars"
          :key="(index+1*100)"
          class="hour-border"
          :x="bar.x"
          :y="bar.y - 2"
          :width="bar.width"
          :height="2"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { format } from 'date-fns';

export default {
  name: 'RainChart',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => ([])
    },
    height: {
      type: Number,
      default: 180
    },
    width: {
      type: Number,
      default: 960
    }
  },
  data() {
    return {
      margin: {
        top: 30,
        right: 0,
        bottom: 30,
        left: 0
      }
    };
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    },

    xAxis() {
      return d3.scaleLinear()
        .domain([0, this.data.length])
        .range([0, this.width - this.margin.left - this.margin.right]);
    },

    yAxis() {
      return d3.scaleLinear()
        .domain([0, 1])
        .range([0, this.height - this.margin.top - this.margin.bottom]);
    },

    rainBars() {
      const x = this.xAxis;
      const y = this.yAxis;

      return this.data.map((element, index) => ({
        x: x(index),
        width: x(index + 1) - x(index),
        y: y(1 - element.pop) + this.margin.top,
        height: y(1) - y(1 - element.pop)
      }));
    }
  },
  mounted() {
    const svg = d3.select('.rain-graph svg');
    const x = this.xAxis;
    const y = this.yAxis;

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${y(1) + this.margin.top})`)
      .call(
        d3.axisBottom(x)
          .tickFormat((d, i) => {
            const date = new Date();
            date.setHours(date.getHours() + ((date.getMinutes() > 30) ? i + 1 : i));
            date.setMinutes(0);

            return format(date, 'HH:mm');
          })
      );

    svg.append('g')
      .attr('class', 'x-axis')
      .call(
        d3.axisBottom(x)
          .tickFormat((i) => (this.data[i]
            ? `${this.data[i].pop * 100}%`
            : ''
          ))
      );
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
          fill: rgba(78, 145, 228, .2)
        }
        &.hour-border {
          fill: #4e91e4;
        }
      }
    }
}

</style>
