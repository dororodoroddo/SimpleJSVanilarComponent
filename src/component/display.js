import component from './component.js';

export default (rootEl) => {
  return new component({
    rootEl: rootEl,
    state: {
      global__test: '123',
    },
    renderFuntion() {
      return `<div>${this.global__test}</div>`;
    }
  });
}