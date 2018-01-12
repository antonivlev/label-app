import React from 'react';

import * as d3 from 'd3';
import {drawDataList} from './drawDataList.js';



class DataDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mid_bucket: 0,
      z: 0
    };
  }

  handleKeys(e) {
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
      e.preventDefault();
      this.zoomInOut(e.code);
      // adjust transform index to avoid panning jumps
      d3.zoomTransform( document.getElementById("canvas") ).x = -this.state.mid_bucket;
    }
  }

  // modifies state according to key
  zoomInOut(key) {
    // unpack what you're changing
    let {mid_bucket, z} = this.state;

    // possibly change it
    if (key === "ArrowDown") {
      let num_zoom_levels = this.props.data_list[0]["x"].length-1;
      if (z < num_zoom_levels) {
        mid_bucket = getScaleFunc(this.props.data_list, z,  z+1)(mid_bucket);
        z++;
      }
    } else if (key === "ArrowUp") {
      if (z > 0) {
        mid_bucket = getScaleFunc(this.props.data_list, z,  z-1)(mid_bucket);
        z--;
      }
    }

    // pack it back in
    this.setState({mid_bucket: mid_bucket, z: z});
  }

  componentDidMount() {
    this.props.onContextCreated( document.getElementById("canvas").getContext("2d") );
    var that = this;

    // add listener for panning
    d3.select("canvas").call(
      d3.zoom().on( "zoom",
        function() {
          // changes state
          let tx = -d3.zoomTransform(this).x;
          that.setState( {mid_bucket: parseInt(tx)} );
        }
      )
    );

    // add listener for zooming
    document.addEventListener("keydown", (e) => {
      this.handleKeys(e);
    });
  }

  render() {
    if (this.props.context !== null) {
      drawDataList(
        this.props.data_list,
        this.props.context,
        this.state.mid_bucket,
        this.state.z
      );
    };

    let style_obj = {
      border: '1px dotted red'
    };

    let jsx_el = (
      <canvas
        id="canvas"
        width="800"
        height="1200"
        style={style_obj}
      ></canvas>
    );

    return jsx_el;
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
