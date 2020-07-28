import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Connection from './components/Connection.vue'
import Message from './components/Message.vue'
import NotFound from './components/NotFound.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Connection},
    {path: '/message', component: Message},
    {path: '*', component: NotFound},
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
