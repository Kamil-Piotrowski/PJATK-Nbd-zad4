printjson(db.people.aggregate([
	{$match: {nationality: "Poland"}},
	{$match: {sex: "Female"}},
	{$unwind: "$credit"},
	{$group:
		{
			_id: "$credit.currency",
			totalBalance:
			{
				$sum:{$toDouble: "$credit.balance"}
			},
			avgBalance:
			{
				$avg:{$toDouble: "$credit.balance"}
			}
		
		}
	}
]).toArray())