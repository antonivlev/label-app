import React from 'react';
import ReactDOM from 'react-dom';

function getStuff() {
  return fetch('/seestore')
    .then( function(res) {
      return res.json();
    })
    .then(doit);
}

function doit(a){
  ReactDOM.render(
    <div>
      <h1>yo i here</h1>
      <h2>hot reload bitch</h2>
      <h4>{a.hello}</h4>
    </div>,
    document.getElementById('root')
  );
}

getStuff();
