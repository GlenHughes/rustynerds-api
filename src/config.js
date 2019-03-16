require("dotenv").config()

module.exports = {
  NAME: "RUSTYNERDSPANEL",
  VERSION: "1.0.0",
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT,
  URL: `${process.env.URL}:${process.env.PORT}`,
  API_URL: `${process.env.API_URL}:${process.env.API_PORT}`,
}
