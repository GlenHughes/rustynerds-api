const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const User = mongoose.model("User")

exports.authenticate = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await User.findOne({ username })

      // Match password
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          throw error
        }

        if (isMatch) {
          resolve(user)
        } else {
          // Pass didn't match
          reject("Authentication Failed")
        }
      })
    } catch (error) {
      reject("Authentication Failed")
    }
  })
}
