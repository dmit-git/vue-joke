import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from './store';
import router from './router/index';
 

Vue.use(Vuetify);
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
