import Store from '../store/store.js';

export default function component({
  rootEl,
  state,
  renderFuntion,
}) {
  let isRender = false;
  let isSync = false;
  this.rootEl = rootEl;
  this.render = () => {
    isRender = true;
    const childs = renderFuntion.call(state);
    if (typeof childs === 'string') {
      rootEl.innerHTML = childs;
    }
    if (typeof childs === 'object') {
      for (const child of childs) {
        rootEl.appendChild(child);
      }
    }
    isRender = false;
  };
  const renderState = [];
  state = new Proxy(state, {
    get: (target, key, reciever) => {
      if(isRender) {
        renderState.push(key);
      }
      return Reflect.get(target, key, reciever);
    },
    set: (target, key, value, reciever) => {
      if (/^global__/.test(key) && !isSync) {
        throw new Error('cannot set on global state');
      }
      if (target[key] !== value && renderState.includes(key)) {
        setTimeout(this.render)
      }
      return Reflect.set(target, key, value, reciever);
    },
  });
  for (const key in state) {
    if (/^global__/.test(key)) {
      const stateKey = key.split('global__')[1];
      Store.stateSetMethods[stateKey].push((value)=>{
        isSync = true;
        state[key] = value;
        isSync = false;
      });
      isSync = true;
      state[key] = Store.state[stateKey];
      isSync = false;
    }
  }

  this.render();
}

export function getSimpleElement(
  type,
  className,
  id,
  innerHTML
) {
  const el = document.createElement(type)
  el.className = className
  el.id = id
  el.innerHTML = innerHTML
  return el
}