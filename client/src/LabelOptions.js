import React from 'react';
import * as d3 from 'd3';
import {last} from 'underscore';

let style_obj = {
  position: 'fixed',
  top: 240,
  right: 0
};

class LabelOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timesList: [
        [1481717805329.4575, 1481717806192.528]
      ],
      colourList: [],

      selectedLabel: null,
      selectedColour: 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        document.getElementById('svg-labels').style.pointerEvents = "all";
      } else if (e.code === 'Delete') {
        let tlist = this.state.timesList;
        if (this.state.selectedLabel !== null) {
          tlist.splice(this.state.selectedLabel, 1);
          this.setState( {'timesList': tlist} );
        }
      } else if (e.code.includes('Digit')) {
        this.setState( {'selectedColour': parseInt(e.key)} );
      }
    });

    document.addEventListener('keyup', (e) => {
      document.getElementById('svg-labels').style.pointerEvents = "none";
    });

    // attach drag listener for drawing
    var that = this;
    // d3.select('#svg-labels').call(d3.drag()
    //   .on('start', function() {
    //     if (d3.event.sourceEvent.altKey) {
    //       let timesList = that.state.timesList;
    //       let pixelToTime = that.props.timeToPixel.invert;
    //
    //       let startp = pixelToTime(d3.event.sourceEvent.screenX);
    //       timesList.push( [startp, startp+1] );
    //       that.setState( {'timesList': timesList} );
    //     }
    //   })
    //   .on('drag', function() {
    //     if (d3.event.sourceEvent.altKey) {
    //       let timesList = that.state.timesList;
    //       let pixelToTime = that.props.timeToPixel.invert;
    //
    //       last(timesList)[1] = pixelToTime(d3.event.sourceEvent.screenX);
    //       that.setState( {'timesList': timesList} );
    //     }
    //   })
    // );
  }

  render() {
    var that = this;
    var colours = [
      'green', 'blue', 'salmon', 'orange', 'purple',
      'khaki', 'lightgreen', 'magenta', 'olive', 'brown'
    ];

    let timeToPixel = this.props.timeToPixel;

    let annos = this.state.timesList.map( function(region, i) {
      if (region.length === 2) {
        let x1 = timeToPixel( region[0] );
        let width = timeToPixel( last(region) ) - x1;
        return (
          <rect key={i}
            className="label-rect"
            x={x1} y="0"
            width={width} height="1200"
            fill={colours[that.state.selectedColour]}

            onMouseOver={(e) => {
              // console.log(e.bubbles);
              // that.setState( {'selectedLabel': i} );
            }}
            onMouseOut={(e) => {
              that.setState( {'selectedLabel': null} );
            }}
            onMouseDown={(e) => {
              console.log(e.bubbles);
            }}
          />
        );
      }
    });

    // implement this but with polylines
    // let annos = this.state.timesList.map( function(region, i) {
    //   if (region.length === 2) {
    //
    //   }
    // });

    return (
      <div style={style_obj}>

        <svg id="svg-labels" width="800" height="1200">
          {/* labeled segments (rects) get appended here */}
          {annos}
        </svg>

        <p>labels {this.state.selectedColour}</p>
        <LabelOption />
        <br/>
        <button>download selected</button>
      </div>
    );
  }
}

function LabelOption(props) {
  return (
    <div>
      <input type="radio" />
      <input type="text" />
    </div>
  );
}

export default LabelOptions;
