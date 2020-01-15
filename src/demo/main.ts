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


import { 
  classDecorator,
  classDecoratorHigher,
  classPropDecorator,
  classPropDecoratorHigher,
  paramsDecorator
 } from "@src/demo/decorator/test";


@classDecoratorHigher('1111', '2222')
class Person {
  name: string;
  constructor(name: string) {
    this.name = name || 'jane';
  }
  @classPropDecoratorHigher({a: 111})
  log(@paramsDecorator arg1:any, arg2:any) {
    console.log(`Arguments Recevied are ${arg1} ${arg2}`);
    return `${arg1} ${arg2}`;
  }
}

let p1 = new Person('王二');
console.log(p1);
(p1 as any).echoName();
p1.log('aaa', 'bbb');