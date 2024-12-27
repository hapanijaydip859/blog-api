var COM = require('../model/comments');
var jwt = require('jsonwebtoken');


exports.ComCreate = async function (req, res, next) {
  try {
    req.body.author = req.authorId
    console.log(req.body.author, "ll");
    console.log(req.authorId, "rr");
    let ComCreate = await COM.create(req.body)
    // let ComCreate = await COM.create(req.body)
    console.log(ComCreate, "++");

    res.status(201).json({
      status: "Success",
      message: "Comment Create Successfull",
      data: ComCreate
    })
  } catch
  (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.ComFind = async function (req, res, next) {
  try {
    // let token = req.headers.Authorization

    // if (!token) {
    //   throw new Error("Please Attach token")
    // }

    // var decoded = jwt.verify(token, 'surat');

    let Comdata = await COM.find().populate("postId")

    res.status(200).json({
      status: "Success",
      message: "Comment Found Successfull",
      data: Comdata
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.ComUpdate = async function (req, res, next) {
  try {
    let Comupdate = await COM.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
      status: "Success",
      message: "Comment update Successfull",
      data: Comupdate
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.ComDelete = async function (req, res, next) {
  try {
    let Comdelete = await COM.findByIdAndDelete(req.params.id)
    if (!Comdelete) {
      res.status(900).json({
        status: "Error",
        message: "Comment Not Found",
      })
    } else {
      res.status(200).json({
        status: "Success",
        message: "Comment delete Successfull",
      })
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    })
  }
}