<template>
    <div id="app">
      <Message
          v-for="message in messages"
          :key="message.id"
          :message="message"
      />
      <Form :message="message" @sendButtonClicked="sendMessage" />
    </div>
</template>

<script>
import axios from 'axios'
import Message from '@/components/Message'
import Form from '@/components/Form'

export default {
  name: 'App',
  components: { Message, Form },
  data () {
      return {
          url: 'http://51.15.254.190:31795/messages',
          messages: [],
          message: { author: '', username: ''}
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

<style scoped>

</style>
