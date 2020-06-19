<template>
  <div>
    <p>{{ text }}</p>
    <p><strong>{{ user }}</strong> - <em>{{ date }}</em></p>
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
      date () { return this.message.date },
  }
}
</script>

<style scoped>

</style>
