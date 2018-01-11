import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

function startAppWithData(server_store){
  ReactDOM.render(
    <App data_list={server_store.data_list} />,
    document.getElementById('root')
  );
}

fetch('/seestore')
  .then( function(res) {
    return res.json();
  })
  .then(startAppWithData);
