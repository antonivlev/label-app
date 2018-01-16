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
    var that = this;

    let rects = d3.select('svg').selectAll('*');
    rects.call(d3.drag()
      .on('drag', function(d, i, nodes) {
        // update state according to what happened in the drag event.
        // bit of back and forth with the scale funcs
        let startp = that.props.timeToPixel(that.state.startTime);
        let new_startt = that.props.timeToPixel.invert(startp+d3.event.dx);
        that.setState( {startTime: new_startt} );

        let currentp = that.props.timeToPixel(that.state.currentTime);
        let new_currentt = that.props.timeToPixel.invert(currentp+d3.event.dx);
        that.setState( {currentTime: new_currentt} );
      })
    );
  }

  render() {
    let startTime = this.state.startTime;
    let timeToPixel = this.props.timeToPixel;

    let startx = timeToPixel(this.state.startTime),
        currentx = timeToPixel(this.state.currentTime),
        endx = timeToPixel(startTime+this.state.duration);

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

export default MyVideo;
