const errors = require("restify-errors")
// const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const User = require("../models/User")
const auth = require("../services/auth")
const config = require("../config")

module.exports = ctx => {
  // const { db, server } = ctx
  const { server } = ctx

  // - Register user
  // server.post("/api/register", (request, response, next) => {
  //   const { username, password } = request.body

  //   const user = new User({
  //     username,
  //     password,
  //   })

  //   bcrypt.genSalt(10, (error, salt) => {
  //     bcrypt.hash(user.password, salt, async (error, hash) => {
  //       // Hash password
  //       user.password = hash
  //       console.log(user)
  //       // Save user
  //       try {
  //         const newUser = await user.save()
  //         response.send(201)
  //         return next()
  //       } catch (error) {
  //         return next(new errors.InternalError(error))
  //       }
  //     })
  //   })
  // })

  server.post("/api/auth", async (request, response, next) => {
    const { username, password } = request.body

    try {
      // - Authenticate user
      const user = await auth.authenticate(username, password)

      // - Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "1hr",
      })

      const { iat, exp } = jwt.decode(token)

      response.send({
        iat,
        exp,
        token,
        username,
      })

      return next()
    } catch (error) {
      return next(new errors.UnauthorizedError(error))
    }
  })
}
