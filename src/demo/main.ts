// import _ from 'lodash';
// import { printMe } from '../common/print';
// console.log('1234');

// function component() {
//   var element = document.createElement('div');
//   var btn = document.createElement('button');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   element.classList.add('hello');
//   btn.innerHTML = 'Click me and check the console!';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element;
// }

// document.body.appendChild(component());


import Vue from 'vue';
import router from './router/index.ts';
import App from './demo.vue';

// @ts-ignore
Vue.config.productionTip = false;
// @ts-ignore
Vue.config.devtools = process.env.NODE_ENV !== 'production';
new Vue({
  router,
  render: (h: any):any => h(App)
}).$mount("#app")

