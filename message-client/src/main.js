import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import Connection from './components/Connection.vue'
import MainScreen from './components/MainScreen.vue'
import NotFound from './components/NotFound.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Connection},
    {path: '/message', component: MainScreen},
    {path: '*', component: NotFound},
  ]
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
