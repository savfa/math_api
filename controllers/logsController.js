const logsModel = require('../models/logsModel');

exports.create = function (req, res) {
  const {
    name,
    mathType,
    inCorrectAnswersCount,
    timeString
  } = req.body;

  logsModel.create( {
    name,
    mathType,
    inCorrectAnswersCount,
    timeString
  })
    .then(({data: log}) => {
    res.send(log);
  }).catch((err) => {
    res.status(400);
    res.json({ error: err.message });
  })
};

exports.filter = function (req, res) {
  const { page, perPage } = req.query;

  //const { } = req.body;


  logsModel.filter({page, perPage})
    .then(({ data, links }) => {
      res.send({ data, links });
    }).catch((err) => {
    res.status(400);
    res.json({ error: err.message });
  })
};
