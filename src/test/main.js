import { printMe } from '../common/print';
import test from './js/test';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = '哈哈哈哈';

  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
