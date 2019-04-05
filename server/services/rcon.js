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
        const command = `chat user add ${steamID} ${kit}`
        const message = `${steamID} granted ${kit} kit successfully`
        console.log(command)
        client.execute(command)
        client.execute(`say ${message}`)
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

exports.formatPlayers = players => {
  console.log(players.message)

  const rows = players.message.split("\r\n")
  const columns = rows
    .shift()
    .split(/\s+/)
    .filter(column => {
      return column !== ""
    })

  let formattedRows
  // handle no players online
  if (rows[0] === "") {
    formattedRows = []
  } else {
    // format response into a json object
    formattedRows = rows.map(row => {
      const splitRow = row.replace(/\s\s+/g, " ")
      const pieces = splitRow.split(" ")
      const id = pieces[0]

      const isNumber = number => {
        console.log(`Is number: ${number}`, parseInt(number, 10))
        return parseInt(number, 10)
      }

      // console.log(splitRow)
      // console.log(pieces)
      // console.log(pieces[2])

      let name
      let ping
      if (isNumber(pieces[2])) {
        console.log(`3 section was ping: ${pieces[2]}`)
        name = `${pieces[1]}`
        ping = `${pieces[2]}`
      } else if (isNumber(pieces[3])) {
        console.log(`4 section was ping: ${pieces[2]}`)
        name = `${pieces[1]}${pieces[2]}`
        ping = `${pieces[3]}`
      } else if (isNumber(pieces[4])) {
        console.log(`5 section was ping: ${pieces[2]}`)
        name = `${pieces[1]}${pieces[2]}${pieces[3]}`
        ping = `${pieces[4]}`
      } else if (isNumber(pieces[5])) {
        console.log(`6 section was ping: ${pieces[2]}`)
        name = `${pieces[1]}${pieces[2]}${pieces[3]}${pieces[4]}`
        ping = `${pieces[5]}`
      } else {
        console.log("max section was ping")
        name = `${pieces[1]}`
        ping = "UNKNOWN"
      }

      return {
        id,
        name,
        ping,
      }
    })
  }

  console.log(rows, formattedRows, columns)

  const data = formattedRows.filter(row => row.id !== "")

  return {
    columns,
    data,
  }
}
