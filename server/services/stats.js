require("dotenv").config()

const mysql = require("mysql")
const NodeCache = require("node-cache")

const allowedTargets = ["x2", "x5"]

const cache = new NodeCache({
  stdTTL: 1800, // 30 mins cache expire
})

const serverDetails = server => {
  let details = {}
  switch (server) {
    case "x2":
      details = {
        host: process.env.STATS_X2_HOST,
        user: process.env.STATS_X2_USER,
        password: process.env.STATS_X2_PASS,
        database: process.env.STATS_X2_DATABASE,
      }
      break
    case "x5":
      details = {
        host: process.env.STATS_X5_HOST,
        user: process.env.STATS_X5_USER,
        password: process.env.STATS_X5_PASS,
        database: process.env.STATS_X5_DATABASE,
      }
      break
    default:
      console.error(`Unknown server ${server} to get details!`)
  }

  return details
}

exports.get = target => {
  return new Promise(async (resolve, reject) => {
    try {
      // debug code to see all stored cache keys
      cache.keys((cacheError, keys) => {
        if (cacheError) {
          console.log(`Error getting stored cache keys! Error: ${cacheError}`)
          return
        }

        console.log("Got list of stored cache keys:", keys)
      })

      if (!allowedTargets.includes(target)) {
        reject(`Invalid target ${target} passed!`)
      }
      const cacheKey = `server-${target}`
      cache.get(cacheKey, (error, value) => {
        if (error) {
          reject(`Error loading cache key: ${cacheKey}`)
          return
        }

        // undefined means no cache
        // console.log(value)
        if (value !== undefined) {
          console.log(`Found cached version with key: ${cacheKey}`)
          resolve(value)
          return
        }

        console.log("running after cache key check")
        const details = serverDetails(target)
        // console.log(details)
        const connection = mysql.createConnection(details)

        connection.connect(connectionError => {
          if (connectionError) {
            reject(`Cant connect to MYSQL: ${connectionError}`)
            return
          }

          console.log(`Connected to MYSQL: ${connection.threadId}`)
        })

        const query = `SELECT * FROM \`stats${target}\``
        // console.log(query)
        connection.query(query, (queryError, results, fields) => {
          if (queryError) {
            reject(queryError)
            return
          }
          // console.log(`Results first field: ${fields[0]}`)
          const data = {
            results,
            fields,
          }
          cache.set(cacheKey, data, cacheError => {
            if (cacheError) {
              console.log(
                `Error storing cache with key: ${cacheKey}. Error: ${cacheError}`,
              )
              return
            }

            console.log(`Successfully stored cache key: ${cacheKey}`)
            connection.end()
            resolve(data)
          })
        })
      })
    } catch (error) {
      reject(`Error connecting to database! ${error}`)
    }
  })
}
