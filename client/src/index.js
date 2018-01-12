import React from 'react';
import ReactDOM from 'react-dom';

import DataDrawer from './DataDrawer.js';
import LabelOptions from './LabelOptions.js';
import MyVideo from './MyVideo.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      pixelsToTime: null
    };

    this.setContext = this.setContext.bind(this);
  }

  setContext(context) {
    this.setState( {ctx: context} );
  }

  render() {
    return (
      <div>
        <div>
          <input type="checkbox" id="video-lock"/>
          <label htmlFor="video-lock">lock video</label>
        </div>

        <DataDrawer id="bigby"
          context={this.state.ctx}
          onContextCreated={this.setContext}
          data_list={this.props.server_store.data_list} />
        <MyVideo context={this.state.ctx} />
        <LabelOptions />
      </div>
    );
  }
}

fetch('/seestore')
  .then( function(res) {
    return res.json();
  })
  .then((server_store) => {
    console.log(server_store);
    ReactDOM.render(
      <App server_store={server_store} />,
      document.getElementById('root')
    );
  });
