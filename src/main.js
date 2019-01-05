import Vue from 'vue';
import Vuetify from 'vuetify';
import * as Sentry from '@sentry/browser';
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

Sentry.init({
  dsn: 'https://f7fe3a42cfbc43db8a589202074ee0f3@sentry.io/1365020',
  integrations: [new Sentry.Integrations.Vue({ Vue })],
});
