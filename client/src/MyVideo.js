import React from 'react';

class MyVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      currentTime: 0
    }
  }

  render() {
    return <video onTimeUpdate={(e) => this.setState({currentTime: e.target.currentTime})} id="vid" src="./Work3_Gavin_Compress.mp4" controls></video>;
  }
}

export default MyVideo;
