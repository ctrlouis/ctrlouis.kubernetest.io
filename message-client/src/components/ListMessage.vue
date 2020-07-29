<template>
  <div class="message" :class="{'received': !isSent, 'sent': isSent}">
    <p class="content">{{ text }}</p>
    <p class="info"><strong>{{ user }}</strong> - <em>{{ date }}</em></p>
  </div>
</template>

<script>
export default {
  name: 'ListMessage',
  props: {
      message: { type: Object, default: () => {} }
  },
  computed: {
      user () { return this.message.username || 'anonym' },
      text () { return this.message.text },
      date () { return new Date(this.message.date).toLocaleString()},
      isSent () { return (this.message.username == this.$store.state.username) ? true : false } //if message is sent by us, message class will change
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: max-content;
  display: flex;
  flex-direction: column;
  .content{
    border: solid 1px darkgray;
    border-radius: 30em;
    padding: .5em 1em;
    width: max-content;
  }
}
.content, .info {
  margin: 0;
  padding: 16px 0;
}
.info {
  overflow: hidden;
  text-overflow: ellipsis;
}
.sent{
  align-self: flex-end;
  .content{
    align-self: flex-end;
    background: #00990077;
  }
}
.received{
  align-self: flex-start;
  .content{
    align-self: flex-start;
  }
}
</style>
