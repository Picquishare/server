const express = require('express')
const app = express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT) || 4000

const indexRoutes = require('./routes/index')
const shareRoutes = require('./routes/share')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRoutes)
app.use('/share', shareRoutes)

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'ERROR 404 - PAGE NOT FOUND'
  })
})

app.listen(port, () => {
  console.log('SERVER IS ON AND LISTEN TO PORT', port)
})

