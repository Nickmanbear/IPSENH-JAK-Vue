<template>
    <div id="timeline">
      <h2>Timeline</h2>
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
};
</script>

<style lang="scss">
  #timeline {
    grid-area: timeline;
    overflow-y: scroll;
    padding: 0 4px;

    &::-webkit-scrollbar {
      display: none;
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
</style>
