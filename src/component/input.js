import Store from '../store/store.js';
import component from './component.js';

export default () => {
  const rootEl = document.createElement('form');
  rootEl.className = 'SearchInput';
  rootEl.onsubmit = () => false;
  const inputEl = document.createElement('input');

  inputEl.type = 'text';
  inputEl.placeholder = 'placeholder';
  inputEl.value = '';
  inputEl.className = 'SearchInput__input';
  inputEl.oninput = (e) => {
    console.log(e.target.value);
    Store.actions.setTest(e.target.value)
  };
  const state = {};
  const renderFuntion = () => [
    inputEl,
  ];
  return new component({
    rootEl,
    state,
    renderFuntion,
  });
};