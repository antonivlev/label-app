const makeResolutions = require('./makeResolutions.js').makeResolutions;
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

//stores the data and window info
const server_store = {};

app.use(express.static('public'));
app.use(bodyParser.json({limit: '5000mb'}));

app.post('/setdata', function(req, res) {
  console.log('got post /setdata');
  console.log('\treceived data from python: ');
  // io.emit('update-status', 'server: got data from python');
  console.log(req.body);

  res.statusCode = 200;
  res.end()
  server_store.data_list = [];


  console.log('\tmaking resolutions');
  // io.emit('update-status', 'server: making resolutions...');

  // convert values to resolutions
  req.body.data_list.map( (file_dict_from_python) => {
    server_store.tvals = makeResolutions(file_dict_from_python['t']);

    let file_obj = {};
    ['x', 'y', 'z'].map( (dim) =>
      file_obj[dim] = makeResolutions(file_dict_from_python[dim])
    );
    server_store.data_list.push(file_obj);
  } );

  console.log('\tdone making resolutions');
  // io.emit('fetch-data');
});

app.get('/seestore', function(req, res) {
  console.log('got get /seestore');
  // var ob = {some_pair56: server_store.data_list[0].x[0][101]};
  res.json(server_store);
  console.log('\tsent server_store');
});

app.get('/peekstore', function(req, res) {
  console.log('got get /peekstore');
  res.json(server_store.data_list[0]['t'][0]);
});

app.listen(3001, () => console.log('label-app on port 3001'));
