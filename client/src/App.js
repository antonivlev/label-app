import React from 'react';
import {scaleLinear} from 'd3';
import _ from 'underscore';

class App extends React.Component {
  componentDidMount() {
    // console.log(document);
    renderStoreCanvas(this.props.data_list);
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

// reads store, draws on #canvas using path methods
// data acts as coords to path methods
function renderStoreCanvas(data_list, mid=500) {
  // var mid = 500;
  var min_bucket = mid - 400;
  var max_bucket = mid + 400;
  var z = 4;
  var num_files = data_list.length;
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.clearRect(0, 0, 800, 1200);

  var n = 0;
  // for each file
  _.range(0, num_files).map( (file_ind) => {
    //draw file
    ["x", "y", "z"].map( (dim) => {
      //draw dimension
      var bucket_arr = data_list[file_ind][dim][z];
      drawPathOnCanvas(ctx, bucket_arr, min_bucket, max_bucket, n*100);
      n++;
    });
  });
}

/*
bucket_arr = [...[3.4, 5.8]...]
min_bucket - which bucket is at pixel 0
max_bucket - which bucket is at pixel 800
low_bound_dist - vertical offset down

takes these and draws
*/
function drawPathOnCanvas(ctx, bucket_arr, min_bucket, max_bucket, low_bound_dist) {
  // data [min, max] --> pixels [10, 140]
  var s = _.compose(
    Math.round,
    scaleLinear()
      .domain([-20, 20])
      .range([low_bound_dist+10, low_bound_dist+90])
  );

  // draw axis
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(0, s(0))
  ctx.lineTo(800, s(0))
  ctx.stroke();

  // start drawing signal
  ctx.strokeStyle = "black";
  ctx.beginPath();
  var pixel = 0;
  for (var buck=min_bucket; buck<=max_bucket; buck++) {
    //for each pixel from min_bucket to max_bucket (set by controls)
    if (buck < 0 || buck >= bucket_arr.length) {
      //skip if controls go outside data
      pixel++;
    } else {
      var points_pair = bucket_arr[Math.round(buck)];
      if (points_pair.length !== 0) {
        if (s(-points_pair[1]) === s(-points_pair[0])) {
          ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
          ctx.fillRect(pixel, s(-points_pair[1])-1, 1, 3);
          ctx.fillRect(pixel-1, s(-points_pair[1]), 3, 1);

          ctx.lineTo(pixel, s(-points_pair[1]));
          ctx.lineTo(pixel, s(-points_pair[0]));
        } else {
          ctx.lineTo(pixel, s(-points_pair[1]));
          ctx.lineTo(pixel, s(-points_pair[0]));
        }
      }
      pixel++;
    }
  }
  ctx.stroke();
}

export default App;
