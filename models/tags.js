const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0-iios3.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

const schema = mongoose.Schema

const TagSchme = new schema({
  tags: {
    type: String,
    required: true
  },
  ShareId: [{
    type: String,
    ref: 'Shares'
  }]
})

var Tags = mongoose.model('Tags', TagSchme)

module.exports = Tags