const Share = require('../models/share'),
Tag = require('../models/tags')

class ShareController {
  static getAllSharePic(req, res) {
    Share
      .find()
      .populate('UserId')
      .then((data) => {
        res.status(200).json(data)
      })

      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static findByTag (req, res) {
      Tag
      .findById(req.params.id)
      .populate({
          path: 'ShareId',
          populate: {
              path: 'UserId'
          }
      })
      .then(function (allShare) {
          res.status(200).json(allShare)
      })
      .catch(function (err) {
          res.status(500).json({
              message: err
          })
      })
  }

  static recentTag (req, res) {
      Tag
      .find({})
      .sort({
          createdAt: 'desc'
      })
      .then(function (allTags) {
          res.status(allTags)
      })
      .catch(function (err) {
        res.status(500).json({
            message: err
        })
      })
  }
}

module.exports = ShareController