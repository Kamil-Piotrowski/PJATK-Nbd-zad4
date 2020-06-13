var mapCurrency = function(){
	for(var i in this.credit){
		var currency = this.credit[i].currency;
		var balance = parseFloat(this.credit[i].balance);
		emit(currency, balance);
	}	
};

function reduceCurrency(id,docs) {
      return Array.sum(docs);
}

db.mapReduceTotalBalance.drop()
db.people.mapReduce(mapCurrency,reduceCurrency,{ out: "mapReduceTotalBalance" })
printjson(db.mapReduceTotalBalance.find({}).toArray())