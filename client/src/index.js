import React from 'react';
import ReactDOM from 'react-dom';
import DataDrawer from './DataDrawer.js';


function getElement(server_store) {
  return (
    <div>
      <div className="right">
        <video src="./Work3_Gavin_Compress.mp4" controls></video>
      </div>

      <div className="left">
        <DataDrawer data_list={server_store.data_list} />
      </div>
    </div>
  );
}

function startAppWithData(server_store){
  ReactDOM.render(
    getElement(server_store),
    document.getElementById('root')
  );
}

// fetch('/seestore')
//   .then( function(res) {
//     return res.json();
//   })
//   .then(startAppWithData);

startAppWithData({});
