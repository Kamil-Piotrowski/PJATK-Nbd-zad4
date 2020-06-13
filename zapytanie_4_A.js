printjson(db.people.aggregate([
	{
		$group:
			{
				_id: "$nationality",
				bmiMin:
				{
					$min:{$sum:{$divide: [{$toDouble: "$weight"},{$multiply:[{$divide:[{$toDouble: "$height"},100]},{$divide: [{$toDouble: "$height"},100]}]}]}}
				},
				bmiMax:
				{
					$max:{$sum:{$divide: [{$toDouble: "$weight"},{$multiply:[{$divide:[{$toDouble: "$height"},100]},{$divide:[{$toDouble: "$height"},100]}]}]}}
				},
				bmiAvg:
				{
					$avg:{$sum:{$divide: [{$toDouble: "$weight"},{$multiply:[{$divide:[{$toDouble: "$height"},100]},{$divide:[{$toDouble: "$height"},100]}]}]}}
				}
			}
	}]).toArray())