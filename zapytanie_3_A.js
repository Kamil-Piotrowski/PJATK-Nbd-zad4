printjson(db.people.aggregate([
    {$group: {
        _id: {job: "$job"},
        count: {$sum: 1}
        }
    },
    {$match: { 
        count: {"$gt": 1}
        }
    },
    {$sort: {
        count: -1
        }
    }
]).toArray())