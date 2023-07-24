var env = "development";
var config = require("./knexConfig")[env]

module.exports = require("knex")(config)