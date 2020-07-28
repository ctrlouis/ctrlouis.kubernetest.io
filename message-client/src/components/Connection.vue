<template>
  <div id="connection">
    <h1>Welcome on Message app</h1>
    <h3>Please enter your message-api service url</h3>
    <input type="text" v-model="url" placeholder="IP:PORT">
    <button type="button" name="button" @click="goToApp()">Confirm</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Connection',
  data(){
    return{
      url: ''
    }
  },
  methods:{
    ...mapActions(['setApiUrl']),

    goToApp(){
      this.setApiUrl(this.url);
      this.$router.push('message');
    }
  }
}
</script>

<style lang="scss" scoped>
#connection{
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
