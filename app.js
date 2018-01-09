const makeResolutions = require('./makeResolutions.js').makeResolutions;
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

//stores the data and window info
const server_store = {'hello': 'test'};

app.use(express.static('public'));
app.use(bodyParser.json({limit: '5000mb'}));

app.post('/setdata', function(req, res) {
  console.log('got post /setdata');
  console.log('\treceived data from python: ');
  // io.emit('update-status', 'server: got data from python');
  console.log('\t'+req.body);

  res.statusCode = 200;
  res.end()
  server_store.data_list = [];

  console.log('\tmaking resolutions');
  // io.emit('update-status', 'server: making resolutions...');

  // convert values to resolutions
  req.body.data_list.map( (file_dict_from_python) => {
    var file_obj = {};
    for (var dim in file_dict_from_python) {
      file_obj[dim] = makeResolutions(file_dict_from_python[dim]);
    }
    server_store.data_list.push(file_obj);
  } );

  console.log('\tdone making resolutions');
  // io.emit('fetch-data');
});

app.get('/seestore', function(req, res) {
  console.log('got get /seestore');
  res.json(server_store);
  console.log('\tsent server_store');
});

app.listen(3001, () => console.log('label-app on port 3001'));
