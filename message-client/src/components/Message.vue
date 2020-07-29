<template>
    <div id="app">
      <div id="messages-list">
        <ListMessage
            v-for="message in orderedMessages"
            :key="message.id"
            :message="message"
        />
      </div>
      <Form :message="message" @sendButtonClicked="sendMessage" />
    </div>
</template>

<script>
import axios from 'axios'
import ListMessage from './ListMessage.vue'
import Form from './Form.vue'

export default {
  name: 'App',
  components: { ListMessage, Form },
  data () {
      return {
          messages: [],
          message: { username: '', text: ''}
      }
  },
  computed: {
      orderedMessages () {
          return Array.from(this.messages).sort((a, b) => {
              return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
          })
      },

      apiUrl () {
          return this.$store.state.apiUrl;
      }
  },
  methods: {
    async sendMessage () {
        const res = await axios.post(`http://${this.apiUrl}/messages`, this.message)
        if (res.status >= 200 && res.status < 300) {
            this.messages.push(this.message)
            this.message = { username: this.message.username, text: '' }
        }
    }
  },
  async mounted() {
      const res = await axios.get(`http://${this.apiUrl}/messages`)
      this.messages = res.data
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Arial, 'sans-serif';
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#messages-list {
  overflow-y: scroll;
  padding: 15px;
  box-shadow: inset 0px -6px 6px 0px rgba(0, 0, 0, .20);
}
#messages-list > .message {
  margin: 15px 0;
}
</style>
