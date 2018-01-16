import React from 'react';

import * as d3 from 'd3';
import {drawDataList} from './drawDataList.js';



class DataDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.ctx = null;
  }

  handleKeys(e) {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.preventDefault();
      this.zoomInOut(e.code);
      // adjust transform index to avoid panning jumps
      d3.zoomTransform( document.getElementById('canvas-data') ).x = -this.props.mid_bucket;
    }
  }

  // modifies state according to key
  zoomInOut(key) {
    // unpack what you're changing
    let {mid_bucket, z} = this.props;

    // possibly change it
    if (key === 'ArrowDown') {
      let num_zoom_levels = this.props.data_list[0]['x'].length-1;
      if (z < num_zoom_levels) {
        mid_bucket = getScaleFunc(this.props.data_list, z,  z+1)(mid_bucket);
        z++;
      }
    } else if (key === 'ArrowUp') {
      if (z > 0) {
        mid_bucket = getScaleFunc(this.props.data_list, z,  z-1)(mid_bucket);
        z--;
      }
    }

    // pack it back in
    this.props.updateParentState({mid_bucket: mid_bucket, z: z});
  }

  componentDidMount() {
    this.ctx = document.getElementById('canvas-data').getContext('2d');
    var that = this;

    // add listener for panning
    d3.select('canvas').call(
      d3.zoom().on( 'zoom',
        function() {
          // changes state
          let tx = -d3.zoomTransform(this).x;
          that.props.updateParentState( {mid_bucket: parseInt(tx)} );
        }
      )
    );

    // add listener for zooming
    document.addEventListener('keydown', (e) => {
      this.handleKeys(e);
    });

    drawDataList(this.props.data_list, this.ctx, this.props.mid_bucket, this.props.z);
  }

  render() {
    if (this.ctx !== null) {
      drawDataList(this.props.data_list, this.ctx, this.props.mid_bucket, this.props.z);
    };

    return <canvas id="canvas-data" width="800" height="1200"></canvas>;
  }
}

/*
helper for zoomInOut

indices in data_list
0 | 1 | 2 | 3 | 4
<- far     close ->

scaling funcs are vertical bars
*/
function getScaleFunc(data_list, ifrom, ito) {
  return d3.scaleLinear()
    .domain([0, data_list[0]["x"][ifrom].length])
    .range([0, data_list[0]["x"][ito].length]);
};


export default DataDrawer;
