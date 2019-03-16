require("dotenv").config()

module.exports = {
  NAME: "RUSTYNERDSPANEL",
  VERSION: "1.0.0",
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT,
  URL: `${process.env.URL}:${process.env.PORT}`,
  API_URL: `${process.env.API_URL}:${process.env.API_PORT}`,
  MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASS
  }@${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}?retryWrites=true`,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  RCON: {
    IP: process.env.RCON_IP,
    PORT: process.env.RCON_PORT,
    PASS: process.env.RCON_PASS,
  },
}
