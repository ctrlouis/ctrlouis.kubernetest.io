<template>
    <div id="app">
      <div id="messages-list">
        <Message
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
import Message from './Message.vue'
import Form from './Form.vue'

export default {
  name: 'MainScreen',
  components: { Message, Form },
  data () {
      return {
          messages: [],
          message: { username: this.$store.state.username, text: ''}
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
            this.getMessages()
            this.message = { username: this.message.username, text: '' }
        }
    },

    getMessages () {
        axios.get(`http://${this.apiUrl}/messages`).then((res) =>{
            this.messages = res.data
        })
    }
  },
  async mounted() {
      const res = await axios.get(`http://${this.apiUrl}/messages`)
      if(res){
        this.messages = res.data
      }
      else{
        console.log('Marche pas')
      }
  }
}
</script>

<style lang="scss">
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
  padding: 1em;
  flex-grow: 1;
  box-shadow: inset 0px -6px 6px 0px rgba(0, 0, 0, .20);
  display: flex;
  flex-direction: column-reverse;

  .message {
    margin: .7em 0;
  }
}
</style>
