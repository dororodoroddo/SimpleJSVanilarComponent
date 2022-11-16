import actions from './actions.js';
import initialState from './state.js';

function store(initialState, actions) {
  this.stateSetMethods = {};
  this.state = new Proxy(initialState(),{
    set: (target, key, value, reciever) => {
      if (target[key] !== value) {
        this.stateSetMethods[key].forEach((methods)=>{
          console.log(value);
          methods(value);
        });
      }
      return Reflect.set(target, key, value, reciever);
    }
  });
  for (const stateKey in this.state) {
    this.stateSetMethods[stateKey] = []
  }
  this.actions = {};
  for (const actionKey in actions) {
    this.actions[actionKey] = actions[actionKey].bind(this.state)
  }
}
const Store = new store(initialState, actions);
export default Store;