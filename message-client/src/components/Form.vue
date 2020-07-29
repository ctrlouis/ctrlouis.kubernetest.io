<template>
  <form @submit.prevent="sendButtonClicked">
    <input id="ipt-username" type="text" v-model="message.username" size="12" placeholder="Your name">
    <input id="ipt-text" type="text" v-model="message.text" placeholder="Your message" required>
    <input type="submit" value="Send">
  </form>
</template>

<script>
export default {
  props: {
    message: { type: Object, default: () => { return { username: '', text: '' } } }
  },
  methods: {
    sendButtonClicked (e) {
        e.preventDefault()
        this.$emit('sendButtonClicked', this.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin input-style {
  border: solid 1px black;
  border-radius: 2px;
}

form {
  display: flex;
  flex-direction: row;
  padding: 1em;
  flex-grow: 1;
  justify-content: center;
  border-top: 1px solid darkgray;
  .group {
    display: flex;
    flex-direction: column;
  }
}

label, input, textarea{
  @include input-style;
}

input{
  padding: .6em;
  min-width: 2em;
  &[type="submit"]{
    width: 60px;
    background-color: #00990077;
    min-width: 60px;
    &:hover{
      cursor: pointer;
      background-color: #009900AA;
    }
  }
}

#ipt-text{
  flex-grow: 1;
}
</style>
