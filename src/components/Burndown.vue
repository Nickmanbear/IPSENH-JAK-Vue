<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>


import LineChart from './LineChart';

export default {
  name: 'Burndown',
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        datasets: [
          {
            label: 'ultime tijd',
            backgroundColor: '#f87979',
            data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
          }, {
            label: 'Echte tijd',
            backgroundColor: 'blue',
            data: [10, 8, 6, 4, 3, 1, 0],
          },
        ],
      };
    },

  },
};
</script>

<style>
  .small {
    max-width: 600px;
    margin: 150px auto;
  }
</style>
