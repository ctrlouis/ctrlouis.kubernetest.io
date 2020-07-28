<template>
  <div id="connection">
    <h1>Welcome on Message app</h1>
    <h3>Please enter your message-api service url</h3>
    <input type="text" v-model="url" placeholder="URL">
  </div>
</template>

<script>
export default {
  name: 'Connection',
  data(){
    return{
      url: ''
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
