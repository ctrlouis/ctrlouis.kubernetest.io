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
          url: 'http://127.0.0.1:57250/messages',
          messages: [],
          message: { author: '', username: ''}
      }
  },
  computed: {
      orderedMessages () {
          return Array.from(this.messages).sort((a, b) => {
              return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
          })
      }
  },
  methods: {
    async sendMessage () {
        const res = await axios.post(this.url, this.message)
        if (res.status >= 200 && res.status < 300) {
            this.messages.push(this.message)
            this.message = { username: '', text: '' }
        }
    }
  },
  async mounted() {
      const res = await axios.get(this.url)
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
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
}
#messages-list {
  overflow-y: scroll;
  padding: 15px;
}
#messages-list > .message {
  margin: 15px 0;
}
</style>
