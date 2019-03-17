const errors = require("restify-errors")
const rcon = require("../services/rcon")

module.exports = ctx => {
  // const { db, server } = ctx
  const { server } = ctx

  server.get("/api/players", async (request, response, next) => {
    console.log("get list of connected players")
    try {
      // - Authenticate user
      const players = await rcon.players()
      const { columns, data } = rcon.formatPlayers(players)

      response.send({
        success: true,
        data,
        columns,
      })

      return next()
    } catch (error) {
      return next(new errors.UnauthorizedError(error))
    }
  })

  server.post("/api/grantKit", async (request, response, next) => {
    console.log("Grant kit called")

    try {
      const { steamID, kit } = request.body
      const message = await rcon.grantKit(steamID, kit)

      response.send({
        success: true,
        message,
      })

      return next()
    } catch (error) {
      return next(new errors.ServiceUnavailableError(error))
    }
  })
}
