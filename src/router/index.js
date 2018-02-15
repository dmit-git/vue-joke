import Vue from 'vue';
import Router from 'vue-router';
import App from '../App.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Jokes',
      component: App,
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: App,
    },
  ],
});