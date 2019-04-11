const User = require('../models/user')
const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static googleSignIn(req, res) {
    let logged = ""

    client.verifyIdToken({
      idToken : req.body.id_token,
      audience : process.env.CLIENT_ID 
    })

      .then((response) => {
        logged = response.payload
        return User.findOne({ email: logged.email })
      })

      .then((data) => {
        if (data) {
          const payload = {
            id: data._id,
            email: data.email,
            username: data.username
          }

          const token = jwt.sign(payload, process.env.JWT_SECRET)

          res.status(200).json({
            token: token
          })

        } else {
          User.create({
            firstName: logged.given_name,
            lastName: logged.family_name,
            email: logged.email,
            username: logged.email,
            password: '12345689'
          })

          .then((data) => {
            res.status(201).json({
              message: 'user created',
              token: jwt.sign({
                id: logged.id,
                email: logged.email,
                username: logged.email
              }, process.env.JWT_SECRET), 
              data: data
            })
          })
        }
      })

      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}

module.exports = UserController