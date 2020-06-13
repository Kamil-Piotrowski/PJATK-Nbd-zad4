printjson(db.people.aggregate([
	{ $unwind: "$credit" },
	{
	  $group:
		{
		  _id: "$credit.currency",
		  totalBalance:
			{
			  $sum:{$toDouble: "$credit.balance"}
			}
		}
	}
  ]).toArray())