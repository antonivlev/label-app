import React from 'react';
import * as d3 from 'd3';

class MyVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: this.props.timeToPixel.invert(200),
      currentTime: 0,
      duration: 0
    }
  }

  componentDidMount() {
    let rects = d3.select('svg').selectAll('*');
    rects.call(d3.drag()
      .on('drag', dragged)
    );
  }

  render() {
    let startTime = this.state.startTime;
    let timeToPixel = this.props.timeToPixel

    let startx = timeToPixel(this.state.startTime),
        currentx = timeToPixel(this.state.currentTime),
        endx = timeToPixel(startTime+this.state.duration);


    // bind data for listener
    d3.select('svg').selectAll('*')
      .data( [startx, startx, currentx, currentx, endx , endx] );

    return (
      <div style={ {position: 'absolute', top: 0, right: 50} }>
        <svg id="svg-video" width="800" height="1200">
          <rect x={startx-10} y="0" width="20" height="1200"/>
          <line x1={startx} y1="0" x2={startx} y2="1200" />

          <rect x={currentx-10} y="0" width="20" height="1200"/>
          <line x1={currentx} y1="0" x2={currentx} y2="1200" />

          <rect x={endx-10} y="0" width="20" height="1200"/>
          <line x1={endx} y1="0" x2={endx} y2="1200" />
        </svg>
        <video id="vid"
          onLoadedMetadata={(e) => this.setState( {duration: e.target.duration*1000} )}
          onTimeUpdate={(e) => this.setState( {currentTime: startTime+e.target.currentTime*1000} )}
          src="./Work3_Gavin_Compress.mp4" controls></video>
      </div>
    );
  }
}

let dragged = function(d, i, nodes) {
  console.log(nodes);
  // d3.selectAll(nodes).attr('x', d = d3.event.x-10);

  // nodes.map( function(node) {
  //   d3.select(node).attr('x', d = d3.event.x-10);
  // });
}

export default MyVideo;
