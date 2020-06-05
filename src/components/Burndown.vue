<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>


import LineChart from './LineChart';


export default {
  name: 'Burndown',
  components: {
    LineChart,
  },
  props: {
    allCards: Array,
    doneCards: Array,
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
      console.log(this.gettotalPoints(this.allCards));
      this.datacollection = {
        labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        datasets: [
          {
            label: 'Perfect burndown',
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
    gettotalPoints(cards) {
      let count = 0;
      cards.forEach((card) => {
        count += card.points;
      });
      return count;
    },

  },
};
</script>

<style>
  .small {
    display: block;
    width: 100%;
    max-width: 750px;
    height: 350px;
    /*margin: 150px auto;*/
  }
</style>
