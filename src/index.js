import component, { getSimpleElement } from './component/component.js';
import display from './component/display.js';
import input from './component/input.js';

const app = document.querySelector('#app');
new component({
  rootEl: app,
  state: {},
  renderFuntion: ()=> {
    return [
      display(getSimpleElement('div','display','','')).rootEl,
      input().rootEl,
    ];
  }
});