// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.restaurantId
  /****************************************/
  // TODO Part III-3-a: find all comments to a restaurant

  // NOTE USE THE FOLLOWING FORMAT. Send type should be 
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }

  console.log("GetCommentsByRestaurantId - id:", id)

  Comment.find({ restaurantId: id })
    .exec((err, data) => {
      if (err) {
        console.log("error:", err)
        res.status(403).send({ message: 'error', contents: [] })
      } else {
        console.log("data:", data)
        res.status(200).send({ message: 'success', contents: data })
      }
    })

}

exports.CreateComment = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const body = req.body
  /****************************************/
  // TODO Part III-3-b: create a new comment to a restaurant

  console.log("req.body:", req.body);

  // const comment = new Comment(body);
  // try {
  //   await comment.save();
  // } catch (e) {
  //   if (e) {
  //     console.log('error: '+e);
  //   } else {
  //     console.log('db saved:', comment);
  //   }
  // }

  const filter = { restaurantId: body.restaurantId, name: body.name };
  const update = { rating: body.rating, content: body.content };

  const existing = await Comment.findOne(filter);
  let newDocument = new Comment(body);

  console.log('existing:', existing)
  console.log('newDocument:', newDocument);

  
  if (existing) {
    try {
      await Comment.updateOne(filter, update);
    } catch (e) {
      res.status(403).send({ message: 'error', contents: "failed" });
    }
  } else {
    try {
      newDocument = await newDocument.save();
    } catch (e) {
      res.status(403).send({ message: 'error', contents: "failed" });
    }
  }
  res.status(200).send({ message: 'success', contents: "successful" });

  console.log('document saved:', newDocument);

}
