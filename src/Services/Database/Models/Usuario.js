const Sequelize = require("sequelize")
const Connection = require("../Connection")

const Usuario = Connection.define("usuario", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Usuario.sync({force: false})
module.exports = Usuario