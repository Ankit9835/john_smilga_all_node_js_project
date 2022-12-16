[
    {
      '$match': {
        'product': new ObjectId('639c02acd88778a6c71f22ca')
      }
    }, {
      '$group': {
        '_id': null, 
        'averageRating': {
          '$avg': '$rating'
        }, 
        'numOfReviews': {
          '$sum': 1
        }
      }
    }
  ]