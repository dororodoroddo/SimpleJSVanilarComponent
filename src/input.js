import component from './component.js';

export default () => {
  const rootEl = document.createElement('form');
  rootEl.className = 'SearchInput';
  rootEl.onsubmit = () => false;
  const inputEl = document.createElement('input');

  inputEl.type = 'text';
  inputEl.placeholder = '프로그램 언어를 입력하세요.';
  inputEl.value = 'Script.';
  inputEl.className = 'SearchInput__input';
  inputEl.onkeydown = (e) => {
    console.log(e.target.value);
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