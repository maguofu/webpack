
import Vue from 'vue';
import Router from 'vue-router';
import Index from '../view/index.vue';
import Result from '../view/result.vue';

// @ts-ignore
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    }
  ]
});