// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const priceFilter = req.query.priceFilter
  const mealFilter = req.query.mealFilter
  const typeFilter = req.query.typeFilter
  const sortBy = req.query.sortBy
  /****************************************/

  // NOTE Hint: 
  // use `db.collection.find({condition}).exec(err, data) {...}`
  // When success, 
  //   do `res.status(200).send({ message: 'success', contents: ... })`
  // When fail,
  //   do `res.status(403).send({ message: 'error', contents: ... })` 

  console.log("<GetSearch fcn>\n");
  console.log("query:", req.query)

  // TODO Part I-3-a: find the information to all restaurants
  let query = {}
  if (priceFilter) query.price = { $in: priceFilter }

  let tag = [];
  if (mealFilter !== undefined && typeFilter !== undefined) {
    tag.push({ "tag": { $in: mealFilter } })
    tag.push({ "tag": { $in: typeFilter } })
    query["$and"] = tag
  } else if (mealFilter !== undefined) {
    query.tag = { $in: mealFilter };
  } else if (typeFilter !== undefined) {
    query.tag = { $in: typeFilter };
  }

  console.log("%j", query)

  Info.find(query).sort(sortBy)
    .exec((err, data) => {
      if (err) {
        console.log("err:", err);
        res.status(403).send({ message: 'error', contents: [] })
      } else {
        // console.log("data:", data);
        res.status(200).send({ message: 'success', contents: data })
      }
    });

  // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
  // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.id
  /****************************************/

  // NOTE USE THE FOLLOWING FORMAT. Send type should be 
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }

  // TODO Part III-2: find the information to the restaurant with the id that the user requests

  console.log("<GetInfo>");
  console.log("id:", id);

  Info.findOne({ id: id })
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