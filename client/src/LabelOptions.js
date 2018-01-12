import React from 'react';
import LabelOption from './LabelOption.js';

let style_obj = {
  position: 'fixed',
  top: 240,
  right: 0
};

class LabelOptions extends React.Component {
  render() {
    return (
      <div style={style_obj}>
        <p>labels</p>
        <LabelOption />
        <br/>
        <button>download selected</button>
      </div>
    );
  }
}

export default LabelOptions;
