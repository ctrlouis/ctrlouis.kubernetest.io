<template>
  <form @submit.prevent="sendButtonClicked">
    <div class="group">
      <label for="ipt-text">Message</label>
      <textarea id="ipt-text" v-model="message.text" required></textarea>
    </div>
    <div class="group">
      <label for="ipt-username">Usermane</label>
      <input id="ipt-username" type="text" v-model="message.username">
    </div>
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

<style scoped>
form {
  align-self: center;
}
form, .group {
  display: flex;
  flex-direction: column;
}
.group {
  width: 70%;
  max-width: 400px;
  margin: 10px auto;
}
label, input, textarea {
  text-align: center;
}
input, textarea {
  border: solid 1px black;
  border-radius: 2px;
}
textarea {
  resize: none;
  height: 150px;
}
input {
  padding: 10px 0;
}
input[type="submit"] {
  width: 60px;
  margin: auto;
  background-color: #00990077;
}
input[type="submit"]:hover {
  cursor: pointer;
  background-color: #009900AA;
}
</style>
