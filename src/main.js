import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from './store';
import router from './router/index';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);
new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  render: h => h(App),
});
