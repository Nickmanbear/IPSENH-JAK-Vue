<template>
  <div class="small">
    <line-chart :options="options" :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>


import LineChart from '../LineChart';


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
      burnColumn: 0,
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
    this.getData();
    this.fillData();
  },
  methods: {
    getData() {
      this.totalPoints = this.gettotalPoints(this.allCards);
      this.burnColumn = this.doneCards[0].column.id;
    },
    fillData() {
      const perDayEvent = Array.from(this.getPerDay(this.events)
        .keys());
      this.datacollection = {
        labels: perDayEvent,
        datasets: [
          {
            label: 'Verlopen punten',
            borderColor: 'rgba(50, 115, 220, 0.5)',
            backgroundColor: 'rgba(50, 115, 220, 0.1)',
            data: this.getEventspoints(this.events),
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
    getPerDay(events) {
      let convertEventsDate = [];
      convertEventsDate = this.convertEventsTimestampToDate(events);

      let groupedMap;
      // eslint-disable-next-line no-shadow,prefer-const
      groupedMap = this.groupBy(convertEventsDate,
        // eslint-disable-next-line no-shadow
        (convertEventsDate) => convertEventsDate.timestamp);
      return groupedMap;
    },
    convertEventsTimestampToDate(events) {
      const options = {
        month: 'numeric',
        day: 'numeric',
      };
      const eventsConvertDay = [];
      events.forEach((event1) => {
        const changedEvnent = event1;
        changedEvnent.timestamp = new Intl.DateTimeFormat('en-GB',
          options).format(new Date(event1.timestamp));

        eventsConvertDay.push(changedEvnent);
      });
      return eventsConvertDay;
    },
    getTimestamps(events) {
      const timestamps = [];
      events.forEach((event) => {
        const options = {
          month: 'numeric',
          day: 'numeric',
        };
        timestamps.push(
          new Intl.DateTimeFormat('en-GB', options).format(new Date(event.timestamp)),
        );
      });
      return timestamps;
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      if (!list || list.length === 0) {
        return map;
      }
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
    getEventspoints(events) {
      const changes = [];
      const changesPerday = [];
      let groupedEvents;
      // eslint-disable-next-line prefer-const
      groupedEvents = this.getPerDay(events);

      console.log(groupedEvents);

      // eslint-disable-next-line no-restricted-syntax
      for (const [key, values] of groupedEvents.entries()) {
        let counter;
        counter = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const event of values) {
          console.log(key, event);
          if (event.toColumn.id === this.burnColumn) {
            counter += event.card.points;
          }
          if (event.fromColumn.id === this.burnColumn) {
            counter -= event.card.points;
          }
        }
        changesPerday.push(counter);
      }
      console.log(changesPerday);

      changes.push(this.totalPoints);
      changesPerday.forEach((day) => {
        changes.push(changes.slice(-1)[0] - day);
      });
      changes.shift();

      // Old method to create the line per event
      // changes.push(this.totalPoints);
      // events.forEach((event) => {
      //   if (event.toColumn.id === 3) {
      //     changes.push(changes.slice(-1)[0] - event.card.points);
      //   } else if (changes.slice(-1)[0] !== this.totalPoints) {
      //     changes.push(changes.slice(-1)[0] + event.card.points);
      //   }
      // });
      console.log(changes);
      return changes;
    },

  },

};
</script>

<style>
  .small {
    display: block;
    width: 100%;
    max-width: 550px;
    border-radius: 3px;
    /*height: 350px;*/
    background: white;
    /*margin: 150px auto;*/
  }
</style>
