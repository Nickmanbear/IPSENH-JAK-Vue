<template>
    <div id="timeline" v-bind:class="{hidden: !showTimeline}">
      <h2 @click="showTimeline = !showTimeline">Timeline</h2>
      <p class="event" v-for="event in timeline" :key="event.id">
        <span>{{
          new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium' })
          .format(new Date(event.timestamp))
        }}</span>:
        <br>
        <span>{{ event.card.name }}</span> moved from
        <span>{{ event.fromColumn.name }}</span> to
        <span>{{ event.toColumn.name }}</span>
      </p>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Board',
  props: {
    timeline: {},
  },
  data() {
    return {
      showTimeline: false,
    };
  },
};
</script>

<style lang="scss">
  #timeline {
    z-index: 80;
    position: fixed;
    top: 80px;
    right: 15px;
    width: 196px;
    padding: 0;
    transition: all 0.5s ease-out;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    h2 {
      margin-top: 0;
      cursor: pointer;
    }

    .event {
      background-color: #eee;
      border: 1px solid #eee;
      border-radius: 3px;
      padding: 8px;
      margin: 8px 0;
      box-shadow: 1px 1px 2px -1px rgba(0,0,0,0.5);

      span {
        font-weight: bold;
      }
    }
  }

  .hidden {
    top: calc(100vh - 45px) !important;
    text-align: center;
    color: white;
    background-color: #d37b33;
    /*border: 5px solid #d37b33;*/
    border-radius: 4px;
    padding: 10px !important;
    width: 110px !important;
    /*TODO styling, optional*/
  }
</style>
