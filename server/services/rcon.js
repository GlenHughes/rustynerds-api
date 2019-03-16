/* eslint-disable class-methods-use-this */
const WebRCON = require("webrconjs")
const config = require("../config")

const allowedKits = ["discord", "bugsyvet", "vipplus", "supporter", "steam"]

class RCON {
  constructor(props) {
    this.canRun = false
    const { ip, port, password } = props
    this.connect(ip, port, password)
  }

  connect(ip, port, password) {
    this.connection = new WebRCON(ip, port)
    this.connection.connect(password)
  }

  execute(command) {
    this.connection.run(command)
  }

  error(error) {
    this.canRun = false
    console.error("Error in WebRCON!")
    console.error(error)
  }

  message(message) {
    console.log(`Message received from RCON server: ${message}`)
  }

  connected() {
    this.canRun = true
  }

  disconnected() {
    console.log("Disconnected from RCON server")
  }
}

exports.grantKit = (steamID, kit) => {
  return new Promise((resolve, reject) => {
    try {
      if (!steamID || !kit) {
        throw new Error("SteamdID and Kit are required params")
      }

      if (!allowedKits.includes(kit)) {
        throw new Error(
          `Invalid kit passed! Valid kits are: ${allowedKits.join(", ")}`,
        )
      }

      const client = new RCON({
        ip: config.RCON.IP,
        port: config.RCON.PORT,
        password: config.RCON.PASS,
      })

      client.connection.on("connect", () => {
        client.execute(`chat user add ${steamID} ${kit}`)
      })

      client.connection.on("message", message => {
        resolve(message)
      })
    } catch (error) {
      reject(error)
    }
  })
}

exports.players = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new RCON({
        ip: config.RCON.IP,
        port: config.RCON.PORT,
        password: config.RCON.PASS,
      })

      client.connection.on("connect", () => {
        client.execute("players")
      })

      client.connection.on("message", message => {
        resolve(message)
      })
    } catch (error) {
      reject("Authentication Failed")
    }
  })
}
