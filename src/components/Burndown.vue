<template>
  <div class="small">
    <line-chart :options="options" v-on: :chart-data="datacollection"></line-chart>
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
    events: Array,
  },
  data() {
    return {
      datacollection: null,
      totalPoints: 0,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
          responsive: true,
        },
      },
    };
  },
  watch: {
    // Watch for the datasets changes.
    allCards() {
      this.fillData();
    },
  },
  mounted() {
    this.gettotalPoints(this.allCards);
    this.getData();
    this.buildDataSets();
    this.fillData();
  },
  methods: {
    getData() {
      this.totalPoints = this.gettotalPoints(this.allCards);
    },
    buildDataSets() {

    },
    fillData() {
      this.datacollection = {
        labels: this.getTimestamps(this.events),
        datasets: [
          {
            label: 'Verlopen punten',
            borderColor: 'rgba(50, 115, 220, 0.5)',
            backgroundColor: 'rgba(50, 115, 220, 0.1)',
            data: this.countDownPoints(this.doneCards),
            steppedLine: true,
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
    getTimestamps(events) {
      const timestamps = [];
      events.forEach((event) => {
        const options = { month: 'numeric', day: 'numeric' };
        timestamps.push(
          new Intl.DateTimeFormat('en-GB', options).format(new Date(event.timestamp)),
        );
      });
      return timestamps;
    },
    getPoints(cards) {
      const points = [];
      points.push(0);
      cards.forEach((card) => {
        points.push(card.points + points.slice(-1)[0]);
      });
      return points.reverse();
    },
    countDownPoints(cards) {
      const points = [];
      points.push(this.totalPoints);
      cards.forEach((card) => {
        points.push(points.slice(-1)[0] - card.points);
      });
      points.shift();
      return points;
    },

  },

};
</script>

<style>
  .small {
    display: block;
    width: 100%;
    max-width: 550px;
    /*height: 350px;*/
    background: white;
    /*margin: 150px auto;*/
  }
</style>
