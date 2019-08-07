import _ from 'lodash';
import './style.less';
import './index.css';
import timu from './timu.png';
import data from './data.xml';
import { printMe } from './print.js';

if (process.env.NODE_ENV === 'production') {
  console.log('Looks like we are in production mode!');
}

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  var myIcon = new Image();
  myIcon.src = timu;
  element.appendChild(myIcon);
  element.appendChild(btn);
  console.log(data);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}