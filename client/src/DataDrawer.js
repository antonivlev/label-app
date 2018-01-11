import React from 'react';
import {drawDataList} from './drawDataList.js'


class DataDrawer extends React.Component {
  componentDidMount() {
    // drawDataList(this.props.data_list);
  }

  render() {
    let style_obj = {
      border: '1px dotted red'
    };

    return (
      <canvas id="canvas" width="800" height="1200" style={style_obj}></canvas>
    );
  }
}

export default DataDrawer;
