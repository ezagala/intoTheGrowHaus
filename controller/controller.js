const db = require("../models");

// Pending findby transaction id, customer type and transaction date (perhaps tender type and transaction ranges)

module.exports = {
  findAll: function (req, res) {
    db.Transaction
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Transaction
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Transaction
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Transaction
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Transaction
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    db.User
      .create(req.body)
      .then(user => {
        console.log("req.body is: ", req.body)
        return res.json(user)
      })
      .catch(err => res.status(422).json(err));
  }
};
