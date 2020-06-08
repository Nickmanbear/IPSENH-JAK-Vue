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
    events: Array,
  },
  data() {
    return {
      datacollection: null,
      totalPoints: 0,
    };
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
          // {
          //   label: 'Perfect burndown',
          //   backgroundColor: '#f87979',
          //   data: this.getPoints(this.allCards),
          // },
          {
            label: 'Echte tijd',
            backgroundColor: 'blue',
            data: this.countDownPoints(this.doneCards),
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
        console.log(card.points);
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
    max-width: 750px;
    height: 350px;
    /*margin: 150px auto;*/
  }
</style>
