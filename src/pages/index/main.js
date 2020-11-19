import './css/style.less';
import './css/index.css';
import timu from './resource/timu.png';
import data from './resource/data.xml';
import { printMe } from '@src/common/print';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  console.log('Looks like we are in production mode!');
}

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

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

// eslint-disable-next-line no-undef
if (module.hot) {
  // eslint-disable-next-line no-undef
  module.hot.accept('@src/common/print.js', () => {
    console.log('Accepting the updated printMe module!');
    printMe();
  });
}