import React from 'react';
import ReactDOM from 'react-dom';

import DataDrawer from './DataDrawer.js';
import LabelOptions from './LabelOptions.js';
import MyVideo from './MyVideo.js';

import './style.css';

import * as d3 from 'd3';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mid_bucket: 0,
      z: 0
    };
  }

  render() {
    let timeToPixel = getTimeToPixel(
      this.props.server_store.tvals, this.state.mid_bucket, this.state.z
    );

    return (
      <div>
        <div>
          <input type="checkbox" id="video-lock"/>
          <label htmlFor="video-lock">lock video</label>
        </div>

        <DataDrawer
          data_list={this.props.server_store.data_list}
          // so that data drawer updates mid bucket and z for video
          updateParentState={this.setState.bind(this)}
          mid_bucket={this.state.mid_bucket}
          z={this.state.z}
        />
        <MyVideo timeToPixel={timeToPixel}/>
        <LabelOptions />
      </div>
    );
  }
}

function getTimeToPixel(tvals, mid, z) {
  let seq = tvals[z];
  let interval = getInterval(seq);
  let buck0 = interval[0],
      buck1 = interval[1];

  var s = d3.scaleLinear()
    .domain( [d3.mean(seq[buck0]), d3.mean(seq[buck1])] )
    .range( [400-(mid-buck0), 400-(mid-buck1)] );

  return s;
}

function getInterval(seq) {
  let first_ind = 10;
  while (seq[first_ind] === []) {
    first_ind++
  };

  let second_ind = first_ind+100;
  while (seq[second_ind] === []) {second_ind++};

  return [first_ind, second_ind];
}

fetch('/seestore')
  .then( function(res) {
    return res.json();
  })
  .then((server_store) => {
    ReactDOM.render(
      <App server_store={server_store} />,
      document.getElementById('root')
    );
  });
