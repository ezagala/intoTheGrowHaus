import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function Store(initialState = {}) {
    this.state = initialState;
  }
  Store.prototype.mergeState = function(partialState) {
    Object.assign(this.state, partialState);
  };
  
  const myStore = new Store();

ReactDOM.render(<App mergeState={myStore.mergeState.bind(myStore)}/>, document.getElementById('root'));
