const Sequelize = require("sequelize")

const Connection = new Sequelize("projeto_tdl", "root", "julioadmin", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = Connection

