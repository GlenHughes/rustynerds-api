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
  preflightMaxAge: 5,
  origins: [
    "http://localhost:4000",
    "http://localhost:5000",
    "https://rustynerds.com",
    "https://staff.rustynerds.com",
  ],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"],
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
  cors.actual,
  restify.plugins.bodyParser({
    mapParams: false,
  }),
  rjwt({ secret: config.JWT_SECRET }).unless({
    path: ["/api/auth"],
  }), // protect routes
)

server.listen(config.PORT, () => {
  console.log("connected to restify")

  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }, (err, db) => {
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
      config.NAME,
      config.VERSION,
      config.PORT,
      config.ENV,
    )

    require("./routes/users")({ db, server })
    require("./routes/rcon")({ server })
  })
})
