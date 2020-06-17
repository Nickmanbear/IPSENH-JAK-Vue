<template>
  <div class="small" v-bind:class="{hiddenburndown: !showBurndown}">
    <h2 @click="showBurndown = !showBurndown">Burndown</h2>
    <line-chart id="chart" :options="options" :chart-data="datacollection"/>
  </div>
</template>

<script>
import LineChart from '@/LineChart';

export default {
  name: 'Burndown',
  components: {
    LineChart,
  },
  props: {
    allCards: Array,
    doneCards: Array,
    timeline: Array,
  },
  data() {
    return {
      showBurndown: false,
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
  computed: {
    events() {
      return [...this.timeline].reverse();
    },
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
        (convertEventDate) => convertEventDate.timestamp);
      return groupedMap;
    },
    convertEventsTimestampToDate(events) {
      const options = {
        month: 'numeric',
        day: 'numeric',
      };
      const eventsConvertDay = [];
      events.forEach((event1) => {
        const changedEvnent = JSON.parse(JSON.stringify(event1));
        changedEvnent.timestamp = new Intl.DateTimeFormat('en-GB',
          options).format(event1.timestamp);
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
          new Intl.DateTimeFormat('en-GB', options).format(event.timestamp),
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
      const groupedEvents = this.getPerDay(events);

      // eslint-disable-next-line no-restricted-syntax,no-unused-vars
      for (const [key, values] of groupedEvents.entries()) {
        let counter;
        counter = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const event of values) {
          if (event.toColumn.id === this.burnColumn) {
            counter += event.card.points;
          }
          if (event.fromColumn.id === this.burnColumn) {
            counter -= event.card.points;
          }
        }
        changesPerday.push(counter);
      }
      changes.push(this.totalPoints);
      changesPerday.forEach((day) => {
        changes.push(changes.slice(-1)[0] - day);
      });
      changes.shift();

      return changes;
    },
  },
};
</script>

<style lang="scss">
  .small {
    text-align: center;
    position: fixed;
    top: 80px;
    right: calc(50vw - 275px);
    width: 100%;
    max-width: 550px;
    border-radius: 3px;
    padding: 1px 16px;
    background: white;
    transition: all 0.5s ease-out;
    z-index: 120;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    h2 {
      cursor: pointer;
    }
  }

  .hiddenburndown {
    top: calc(100vh - 45px) !important;
    text-align: center;
    color: white;
    background-color: #d37b33;
    z-index: 90;
    right: 220px;
    border-radius: 4px;
    padding: 10px !important;
    width: 120px !important;

    h2 {
      margin: 0;
    }
  }
</style>
