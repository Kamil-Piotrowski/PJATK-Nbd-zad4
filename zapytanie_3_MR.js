var mapJob  = function(){
	emit({job: this.job}, 1);
};

function reduceJob(id,docs) {
      return Array.sum(docs);
}

db.mapReduceUniqueJobs.drop()
db.people.mapReduce(mapJob,reduceJob,{ out: "mapReduceUniqueJobs" })
printjson(db.mapReduceUniqueJobs.find({}).toArray())
