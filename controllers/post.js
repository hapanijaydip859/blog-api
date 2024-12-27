var Post = require('../model/Post');

exports.PostCreate = async function (req, res, next) {
    try {

        req.body.images = req.files.images.map(el => el.filename),

        req.body.video = req.files.video[0].filename
        // req.body.video (store video in video field)
        let PostCreate = await Post.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "Post Create Successfull",
            data: PostCreate
        })
    } catch
    (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.PostFind = async function (req, res, next) {
    try {
        // let token = req.headers.authorization

        // if (!token) {
        //     throw new Error("Please Attach token")
        // }
        // var decoded = jwt.verify(token, 'surat');

        let Postdata = await Post.find().populate('authorId').populate("categoryIds")

        res.status(200).json({
            status: "Success",
            message: "Post Found Successfull",
            data: Postdata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.PostUpdate = async function (req, res, next) {
    try {
        let Postupdate = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: "Success",
            message: "Post update Successfull",
            data: Postupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.PostDelete = async function (req, res, next) {
    try {
        let Postdelete = await Post.findByIdAndDelete(req.params.id)
        if (!Postdelete) {
            res.status(900).json({
                status: "Error",
                message: "Post Not Found",
            })
        } else {
            res.status(200).json({
                status: "Success",
                message: "Post delete Successfull",
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}