const Share = require('../models/share')

class ShareController {
  static getAllSharePic(req, res) {
    Share
      .find()
      .then((data) => {
        res.status(200).json(data)
      })

      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }
}

module.exports = ShareController