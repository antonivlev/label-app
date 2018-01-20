import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

import * as d3 from 'd3';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [],
      squares: []
    }
  }

  drawLine(e) {
    let ctx = document.getElementById('main').getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(0, e.nativeEvent.offsetY);
    ctx.lineTo(500, e.nativeEvent.offsetY);
    ctx.stroke();
  }

  render() {
    return (
      <div>
        <canvas id="main"
          onClick={(e) => this.drawLine(e)}
        ></canvas>

        <svg
          id="overlay-circ"
          onClick={ (e) => {
            let circs = this.state.circles;
            circs.push(<circle key={e.screenX+e.screenY}
              cx={e.nativeEvent.offsetX} cy={e.nativeEvent.offsetY} r="10" />)
            this.setState( {'circles':circs} )
          } }
        >
          {this.state.circles}
        </svg>

        <svg
          id="overlay-rect"
          onClick={ (e) => {
            console.log('click');
            let squares = this.state.squares;
            squares.push(<rect key={e.screenX+e.screenY}
              x={e.nativeEvent.offsetX} y={e.nativeEvent.offsetY} width="10" height="10" />)

            this.setState( {'squares':squares} )
          } }
        >
          {this.state.squares}
        </svg>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
