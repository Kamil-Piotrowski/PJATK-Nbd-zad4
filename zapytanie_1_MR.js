var mapFunctionHeight  = function(){
	emit(this.sex, this.height);
};

var mapFunctionWeight  = function(){
	emit(this.sex, this.weight);
};

var reduceFunctionWeight  = function(keySex, valuesWeight){
	return Array.avg(valuesWeight);
};

var reduceFunctionHeight  = function(keySex, valuesHeight){
	return Array.avg(valuesHeight);
};

db.mapReduceWeight.drop()
db.mapReduceHeight.drop()

db.people.find().forEach( function (x) {
x.height = parseFloat(x.height);
db.people.save(x);
});
db.people.find().forEach( function (x) {
x.weight = parseFloat(x.weight);
db.people.save(x);
});

db.people.mapReduce(mapFunctionHeight,reduceFunctionHeight,{ out: "mapReduceHeight" })
db.people.mapReduce(mapFunctionWeight,reduceFunctionWeight,{ out: "mapReduceWeight" })
printjson(db.mapReduceWeight.find({}).toArray())
printjson(db.mapReduceHeight.find({}).toArray())
