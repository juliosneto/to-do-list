const Sequelize = require("sequelize")
const Connection = require("../Connection")
const Usuario = require("./Usuario")

const Tarefa = Connection.define("tarefas", {
    tarefa: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Usuario.hasMany(Tarefa)
Tarefa.belongsTo(Usuario)

Tarefa.sync({force: false})
module.exports = Tarefa