import React from 'react';

class MyVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: this.props.timeToPixel.invert(200),
      currentTime: 0,
      duration: 0,

      ctx: null
    }
  }

  componentDidMount() {
    this.setState( {'ctx': document.getElementById('canvas-video').getContext('2d')} );
  }

  render() {
    let startTime = this.state.startTime;
    let ctx = this.state.ctx;
    let timeToPixel = this.props.timeToPixel

    if (ctx !== null) {
      ctx.clearRect(0, 0, 800, 1200);
      drawVertLine(ctx, timeToPixel(this.state.startTime));
      drawVertLine(ctx, timeToPixel(this.state.currentTime));
      drawVertLine(ctx, timeToPixel(startTime+this.state.duration));
    }

    return (
      <div style={ {position: 'absolute', top: 0, right: 50} }>
        <canvas id="canvas-video" width="800" height="1200"></canvas>
        <video id="vid"
          onLoadedMetadata={(e) => this.setState( {duration: e.target.duration*1000} )}
          onTimeUpdate={(e) => this.setState( {currentTime: startTime+e.target.currentTime*1000} )}
          id="vid" src="./Work3_Gavin_Compress.mp4" controls></video>
      </div>
    );
  }
}


function drawVertLine(ctx, pixel) {
  if (ctx !== null) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(pixel, 0);
    ctx.lineTo(pixel, 1200);
    ctx.stroke();
  }
}

export default MyVideo;
