const { sequelize } = require('../db_connection');
const { DataTypes } = require('sequelize');
const _ = require('lodash');
const path = require('path');

const Logs = sequelize.define('Logs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  math_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time_string: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incorrect_answers_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'logs'
});

exports.create = function ({ name, mathType, inCorrectAnswersCount, timeString }) {
  return Logs.create({ name, math_type: mathType, incorrect_answers_count: inCorrectAnswersCount, time_string: timeString })
    .then((log) => { // .toJSON({ plain: true }) | .get({plain:true})

      return log.toJSON({ plain: true });
    })
};

exports.filter = function ({ page = 1, perPage = 25, mathTypes }) {
  const offset = (+page - 1) * +perPage;

  return Logs.findAndCountAll({
   /* where: {
      math_type: mathTypes
    },*/
    limit: +perPage,
    offset: offset,
    raw: true
  })
    .then(({count, rows}) => {
      const totalPages = Math.ceil(count / +perPage);
      const pagination = {
        currentPage: +page,
        nextPage: +page < totalPages ? +page + 1 : null,
        prevPage: +page > 1 ? +page - 1 : null,
        lastPage: totalPages,
        objectsCount: count
      };
      return {
        data: rows,
        links: pagination
      };
    });
};

