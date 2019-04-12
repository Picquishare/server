const router = require('express').Router()

const ENV = require('dotenv')
ENV.config()
const jwt = require('jsonwebtoken')

const Share = require('../models/share')
const Tags = require('../models/tags')

const authentication = require('../middlewares/authentication')
const controller = require('../controllers/share')
const { checkTag } = require('../helpers/checkTagsExist')

const gcsMiddlewares = require('../middlewares/google-cloud-storage')
const Multer = require('multer')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    }
})

// add new post
router.post('/upload', multer.single('image'), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
    const { caption, tags } = req.body
    const token = req.headers.token
    const decode = jwt.decode(token, process.env.JWT_SECRET)

    const split = tags.split(',')

    let url = ''
    if (req.file && req.file.gcsUrl) {
        url = req.file.gcsUrl
    } else {
        throw new Error('Unable to upload');
    }

    Share.create({
        caption: caption,
        UserId: decode.id,
        tags: split,
        imageLink: url
    })
        .then((data) => {
            if (data.tags.length > 0) {
                data.tags.forEach(e => {
                    checkTag(e, data._id)
                });
            }
            console.log(data)
        })
        .catch(function (e) {
            res.status(500).json({
                message: e.message
            })
        })
})

// getall picture
router.get('/', authentication, controller.getAllSharePic)

module.exports = router