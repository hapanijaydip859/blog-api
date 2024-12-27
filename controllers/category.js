var CATE = require('../model/category');
// var jwt = require('jsonwebtoken');


exports.CateCreate = async function (req, res, next) {
  try {
    let CateCreate = await CATE.create(req.body)

    res.status(201).json({
      status: "Success",
      message: "Category Create Successfull",
      data: CateCreate
    })
  } catch
  (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.CateFind = async function (req, res, next) {
  try {
    // let token = req.headers.Authorization

    // if (!token) {
    //   throw new Error("Please Attach token")
    // }
    // var decoded = jwt.verify(token, 'surat');

    let Catedata = await CATE.find()

    res.status(200).json({
      status: "Success",
      message: "Category Found Successfull",
      data: Catedata
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.CateUpdate = async function (req, res, next) {
  try {
    let Cateupdate = await CATE.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
      status: "Success",
      message: "Category update Successfull",
      data: Cateupdate
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.CateDelete = async function (req, res, next) {
  try {
    let Catedelete = await CATE.findByIdAndDelete(req.params.id)
    if (!Catedelete) {
      res.status(900).json({
        status: "Error",
        message: "category Not Found",
      })
    } else {
      res.status(200).json({
        status: "Success",
        message: "Category delete Successfull",
      })
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    })
  }
}