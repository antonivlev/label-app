const d3 = require('d3');
const _ = require('underscore');

var makeResolution = function(vals, num_buckets) {
	//console.log(vals);
	/* vals - list of values [12.78, 345, 43.5 ...]
	   num_buckets - number of buckets to shove them into

	   returns [ ..., [min, max], ... ]
	*/
	var s = d3.scaleLinear()
		.domain([0, vals.length])
		.range([0, num_buckets-1]);

	// initialise list of buckets
	var resol = _.map(_.range(0, num_buckets), ()=>[]);

	// fill up resolution
	_.map(vals, function assignToBucket(val, i) {
		var bucket_index = Math.round(s(i));
		resol[bucket_index].push(val);
	});

	// only leave min and max in each bucket
	resol = _.map(resol,
		(bucket) => bucket.length === 0 ? []: [_.min(bucket), _.max(bucket)]
	);

	return resol;
}

var makeResolutions = function(vals) {
	var zoom_levels = [600000, 200000, 100000, 10000, 1000];
	var makeResWithVals = _.partial(makeResolution, vals);
	var reses = _.map(zoom_levels, makeResWithVals);
	return reses;
}

exports.makeResolutions = makeResolutions;
