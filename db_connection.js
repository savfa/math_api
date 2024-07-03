// todo: name/login/password указать из настроек хостинга
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("math", "root", "", {
    host: "localhost",
    dialect: "mysql",
    timezone:"Europe/Moscow",
});

try {
    sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}

exports.sequelize = sequelize;
