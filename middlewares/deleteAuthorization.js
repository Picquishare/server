const Share = require('../models/share')

module.exports = (req, res, next) => {
  let getId = { _id: req.params.id }

  Share
    .findById(getId)
    .then((data) => {
      if (data.UserId != req.data.id) {
        throw 'DILARANG DELETE GAMBAR ORANG'
      } else {
        next()
      }
    })

    .catch((err) => {
      res.status(400).json({
        message: err
      })
    })
}