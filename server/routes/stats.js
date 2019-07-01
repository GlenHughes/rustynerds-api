const errors = require("restify-errors")
const stats = require("../services/stats")

module.exports = ctx => {
  const { server } = ctx

  const getStats = (target, id) => {
    target.get(`/api/stats/${id}`, async (request, response, next) => {
      console.log(`get stats for the ${id} server from its database`)
      try {
        // console.log(stats)
        const { results } = await stats.get(id)

        response.send({
          success: true,
          results,
        })

        return next()
      } catch (error) {
        return next(new errors.ServiceUnavailableError(error))
      }
    })
  }

  getStats(server, "x2")
  getStats(server, "x5")
}
