var Auth = require('../model/author');
var jwt = require('jsonwebtoken');
// const nodemailer = require("nodemailer");
const multer = require('multer')

// for mail send (mailer)
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "moviedownload8849@gmail.com",
//     pass: "xxxxx",
//   },
// });

// async function main(mail) {
//   const info = await transporter.sendMail({
//     from: 'moviedownload8849@gmail.com', // sender address
//     to: mail, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }
// -----------------------------------------

// for file upload (multer)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname) //file.originalname for file type(.png, .jpg, .mp4)
  }
})

exports.upload = multer({ storage: storage })

// -----------------------------------------

exports.secure = async function (req, res, next) {
  try {
    
    let token = req.headers.authorization

    if (!token) {
      throw new Error("Please Attach token")
    }
    var decoded = jwt.verify(token, 'surat');

    let AuthCheck = await Auth.findById(decoded.id);

    if (!AuthCheck) {
      throw new Error("Author Not Found")
    }
    next()
  } catch
  (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.AuthCreate = async function (req, res, next) {
  try {
    // 1st : Accept a single file 
    req.body.profile = req.file.filename
    //  OR  //

    // 2nd : Accept an array of files      
    // req.body.profile = req.files.map(file => file.filename);
    //  OR //

    // 3rd : Accept a mix of files    
    // req.body.profile = req.files.profile.map(el => el.filename)
    // req.body.video = req.files.video.map(el => el.filename)
    // OR //
    // req.files.video[0].filename // for single


    let AuthCreate = await Auth.create(req.body)
    // console.log(AuthCreate, "++=");


    // main(AuthCreate.email) for mail send
    res.status(201).json({
      status: "Success",
      message: "author Create Successfull",
      data: AuthCreate,

    })
  } catch
  (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.AuthFind = async function (req, res, next) {
  try {
    let token = req.headers.authorization

    if (!token) {
      throw new Error("Please Attach token")
    }
    var decoded = jwt.verify(token, 'surat');

    let Authdata = await Auth.findById(decoded.id)

    res.status(200).json({
      status: "Success",
      message: "author Found Successfull",
      data: Authdata
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.Authlogin = async function (req, res, next) {
  try {
    let AuthLogin = await Auth.findOne({ email: req.body.email })
    let passwordC = await Auth.findOne({ password: req.body.password })

    if (!AuthLogin) {
      throw new Error("author Not Found!")
    } else if (!passwordC) {
      throw new Error("Wrong Password!")
    }
    var token = jwt.sign({ id: AuthLogin._id }, 'surat');

    res.status(200).json({
      status: "Success",
      message: "author login Successfull",
      data: AuthLogin,
      token
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.AuthUpdate = async function (req, res, next) {
  try {
    let Authupdate = await Auth.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
      status: "Success",
      message: "author update Successfull",
      data: Authupdate
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.AuthDelete = async function (req, res, next) {
  try {
    let Authdelete = await Auth.findByIdAndDelete(req.params.id)
    if (!Authdelete) {
      res.status(900).json({
        status: "Error",
        message: "author Not Found",
      })
    } else {
      res.status(200).json({
        status: "Success",
        message: "author delete Successfull",
      })
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    })
  }
}
