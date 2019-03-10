const express = require("express")
const morgan = require("morgan")
const path = require("path")
const WebRCON = require("webrconjs")

const app = express()
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname, "/client/build")))

app.get("/api/test", (req, res) => {
  res.json({
    message: "hello world",
  })
})

function connectedCallback() {
  console.log("CONNECTED")
}

function disconnectedCallback() {
  console.log("DISCONNECTED")
}

function messageCallback(message) {
  console.log(`Message: ${message}`)
}

function errorCallback(error) {
  console.log(`Error: ${error}`)
}

app.post("/api/login", (req, res) => {
  const rcon = new WebRCON("108.61.116.90", 28068)

  rcon.on("connect", connectedCallback)
  rcon.on("disconnect", disconnectedCallback)
  rcon.on("message", messageCallback)
  rcon.on("error", errorCallback)

  res.json({
    success: false,
    message: "Invalid credentials you nauty",
  })
})

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`server listening on ${port}`) // eslint-disable-line no-console
