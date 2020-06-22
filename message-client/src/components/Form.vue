<template>
  <div>
    <label for="ipt-text">Message</label>
    <input id="ipt-text" type="text" v-model="message.text">
    <label for="ipt-username">Usermane</label>
    <input id="ipt-username" type="text" v-model="message.username">
    <input type="button" value="Send" @click="sendButtonClicked">
  </div>
</template>

<script>
export default {
  props: {
    message: { type: Object, default: () => { return { username: '', text: '' } } }
  },
  methods: {
    sendButtonClicked () { this.$emit('sendButtonClicked', this.message) }
  }
}
</script>

<style scoped>

</style>
