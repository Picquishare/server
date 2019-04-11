const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

const dbconnect = process.env.DB_NAME
mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const schema = mongoose.Schema

const ShareSchme = new schema({
  caption: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    ref: 'Tags'
  }],
  UserId: {
    type: schema.Types.ObjectId,
    ref: 'Users'
  },
}, {
  timestamps:{}
})  

var Shares = mongoose.model('Shares', ShareSchme)

module.exports = Shares