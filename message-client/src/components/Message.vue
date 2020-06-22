<template>
  <div class="message">
    <p class="content">{{ text }}</p>
    <p class="info"><strong>{{ user }}</strong> - <em>{{ date }}</em></p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
      message: { type: Object, default: () => {} }
  },
  computed: {
      user () { return this.message.username || 'anonym' },
      text () { return this.message.text },
      date () { return new Date(this.message.date).toLocaleString()},
  }
}
</script>

<style scoped>
.message {
  border: solid 1px black;
  border-radius: 2px;
}
.content, .info {
  text-align: center;
  margin: 0;
  padding: 16px 0;
}
.info {
  background-color: #00990077;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
