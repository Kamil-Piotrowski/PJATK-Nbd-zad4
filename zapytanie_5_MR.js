var map = function(){
	for(var i in this.credit){
		var currency = this.credit[i].currency;
		var bal = parseFloat(this.credit[i].balance);
		var value = {SUM: bal, count:1};
		emit(currency, value);
	}	
};

var reduce = function(key, values){
	var rv = {SUM: 0, count: 0};
	values.forEach(function(val) {
          rv.SUM += val.SUM;
          rv.count += val.count;
      });
	  
      return rv;
};

var finalizeAVG = function (key, reduceVal){ 
	reduceVal.avgSum = reduceVal.SUM / reduceVal.count;
    return reduceVal;
}

db.people.mapReduce(map,reduce,{query: {sex: "Female", nationality: "Poland"}, out: "mapReduceBalance5", finalize: finalizeAVG})
printjson(db.mapReduceBalance5.find({}).toArray())