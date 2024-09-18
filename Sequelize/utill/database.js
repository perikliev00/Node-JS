const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete','root','114756alex', {
    dialect: "mysql",
    host: "localhost"
})
module.exports = sequelize;