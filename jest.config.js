module.exports = {
  collectCoverageFrom: ["./src/**/*.js"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    ".*\\.css$": "<rootDir>/jest-mocks/cssModule.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest-mocks/image.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test-setup.js"],
  testRegex: "tests/.*\\.test\\.js$",
}
