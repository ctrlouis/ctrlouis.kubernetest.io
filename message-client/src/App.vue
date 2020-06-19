<template>
    <div>
      <Message
          v-for="message in messages"
          :key="message.id"
          :message="message"
      />
    </div>
</template>

<script>
import axios from 'axios'
import Message from '@/components/Message'

export default {
  name: 'App',
  components: { Message },
  data () {
      return {
          url: 'http://51.15.254.190:31795/messages',
          messages: []
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
