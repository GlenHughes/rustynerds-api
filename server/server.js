const restify = require("restify")
const errors = require("restify-errors")
const mongoose = require("mongoose")
const rjwt = require("restify-jwt-community")
const corsMiddleware = require("restify-cors-middleware")
const config = require("./config")
const User = require("./models/User") // eslint-disable-line no-unused-vars

console.log(config)

const server = restify.createServer({
  name: config.NAME,
  version: config.VERSION,
})

const cors = corsMiddleware({
  origins: ["http://localhost:4000"],
})

// trigger this error when some in-existing route being called
server.on("NotFound", (req, res, err, cb) => {
  console.log(JSON.stringify(err, null, 2)) // { "code": "ResourceNotFound", "message": "/xxxx does not exist" }
  console.log(err.toString()) // ResourceNotFoundError: /xxxx does not exist
  console.log(err.code) // Error
  if (err instanceof errors.ResourceNotFoundError) {
    console.log("CHUMBAWAMBA")
  }

  cb()
})

server.pre(cors.preflight)

// - Middleware
server.use(
  restify.plugins.bodyParser({
    mapParams: false,
  }),
  cors.actual,
  rjwt({ secret: config.JWT_SECRET }).unless({ path: ["/api/auth"] }), // protect routes
)

server.listen(config.PORT, () => {
  console.log("connected to restify")
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }, (err, db) => {
    // mongoose.connect(
    // "mongodb+srv://glen-bugsy:om6LWHMV4vcCmgcw@rustynerdsadmin-hr9o1.mongodb.net/rusty-nerds?retryWrites=true",
    // { useNewUrlParser: true },
    // (err, db) => {
    console.log("connected to mongoose")
    if (err) {
      console.log(
        "An error occurred while attempting to connect to MongoDB",
        err,
      )
      process.exit(1)
    }

    console.log(
      "%s v%s ready to accept connections on port %s in %s environment.",
      server.name,
      config.version,
      config.port,
      config.env,
    )

    require("./routes/users.js")({ db, server })
  })
})

// const WebRCON = require('webrconjs')
// const rcon = new WebRCON('108.61.116.90', 28068)

// rcon.on('connect', connectedCallback)
// rcon.on('disconnect', disconnectedCallback)
// rcon.on('message', messageCallback)
// rcon.on('error', errorCallback)

// res.json({
//   success: false,
//   message: 'Invalid credentials you nauty'
// })
// function connectedCallback () {
//   console.log('CONNECTED')
// }

// function disconnectedCallback () {
//   console.log('DISCONNECTED')
// }

// function messageCallback (message) {
//   console.log(`Message: ${message}`)
// }

// function errorCallback (error) {
//   console.log(`Error: ${error}`)
// }
