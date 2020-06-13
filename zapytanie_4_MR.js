var mapAVG = function() {
	var w = parseFloat(this.weight);
	var h = parseFloat(this.height);
	var bmi = w / ((h*h)/10000);
	var value = {SUM: bmi, count:1};
	emit(this.nationality, value);
};

var reduceAVG = function(key, values) {
	var rv = {SUM: 0, count: 0};
	values.forEach(function(val) {
          rv.SUM += val.SUM;
          rv.count += val.count;
      });
	  
      return rv;
};
var finalizeAVG = function (key, reduceVal){ 
	reduceVal.avgBMI = reduceVal.SUM / reduceVal.count;
    return reduceVal;
}



var mapMin = function() {
	var w = parseFloat(this.weight);
	var h = parseFloat(this.height);
	var min = w / ((h*h)/10000);
    emit(this.nationality, min);
};

var mapMax = function() {
	var w = parseFloat(this.weight);
	var h = parseFloat(this.height);
	var max = w / ((h*h)/10000);
    emit(this.nationality, max);
};

var reduceMin = function(key, values) {
    var min = values[0];
    values.forEach(function(val) {
        if (val < min) min = val;
    })
    return min;
};


var reduceMax = function(key, values) {
    var max = values[0];
    values.forEach(function(val){
        if (val > max) max = val;
    })
    return max;
}


db.mapReduceBmiMin.drop()
db.mapReduceBmiMax.drop()
db.mapReduceBmiAvg.drop()
db.people.mapReduce(mapMin,reduceMin, {out: "mapReduceBmiMin" })
db.people.mapReduce(mapMax,reduceMax, {out: "mapReduceBmiMax" })
db.people.mapReduce(mapAVG,reduceAVG, {out: "mapReduceBmiAvg", finalize: finalizeAVG})
printjson(db.mapReduceBmiMin.aggregate([
	{
    $lookup: {
            from: "mapReduceBmiMax",
            localField: "_id",
            foreignField: "_id",
            as: "Maximum"
        }
	},
	{
	$lookup: {
            from: "mapReduceBmiAvg",
            localField: "_id",
            foreignField: "_id",
            as: "Average"
        },
	},
	{
		$unwind: "$Maximum"
	},
	{
		$unwind: "$Average"
	}]).toArray())