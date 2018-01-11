import React from 'react';
import ReactDOM from 'react-dom';

import DataDrawer from './DataDrawer.js';
import LabelOptions from './LabelOptions.js';

function getElement(server_store) {
  return (
    <div>
      <div>
        <input type="checkbox" id="video-lock"/>
        <label htmlFor="video-lock">lock video</label>
      </div>

      <DataDrawer id="bigby" data_list={server_store.data_list} />
      <video src="./Work3_Gavin_Compress.mp4" controls></video>
      <LabelOptions />
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
