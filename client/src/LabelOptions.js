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
      timesList: [],
      selectedLabel: null
    }
    this.selectLabel = this.selectLabel.bind(this);
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
      }
    });

    document.addEventListener('keyup', (e) => {
      document.getElementById('svg-labels').style.pointerEvents = "none";
    });

    var that = this;
    d3.select('#svg-labels').call(d3.drag()
      .on('start', function() {
        let timesList = that.state.timesList;
        let pixelToTime = that.props.timeToPixel.invert;

        let startp = pixelToTime(d3.event.sourceEvent.screenX);
        timesList.push( [startp, startp+1] );
        that.setState( {'timesList': timesList} );
      })
      .on('drag', function() {
        let timesList = that.state.timesList;
        let pixelToTime = that.props.timeToPixel.invert;

        last(timesList)[1] = pixelToTime(d3.event.sourceEvent.screenX);
        that.setState( {'timesList': timesList} );
      })
    );
  }

  selectLabel(e) {
    console.log(e, this);
  }

  render() {
    let timeToPixel = this.props.timeToPixel;
    var that = this;
    let annos = this.state.timesList.map( function(region, i) {
      if (region.length === 2) {
        let x1 = timeToPixel( region[0] );
        let width = timeToPixel( last(region) ) - x1;
        return (
          <rect key={i}
            className="label-rect"
            x={x1} y="0"
            width={width} height="1200"
            onMouseOver={(e) => {
              that.setState( {'selectedLabel': i} );
            }}
            onMouseOut={(e) => {
              that.setState( {'selectedLabel': null} );
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

        <p>labels</p>
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
