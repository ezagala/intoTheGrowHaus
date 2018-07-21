const router = require("express").Router();
const controller = require("../../controller/controller");
var passport = require('passport');
require('../../passport')();

// Matches with "/api/transactions"
router.route("/")
  .get(controller.findAll)
  .post(controller.create);

// Matches with "/api/transactions/:id"
// Will need to add condition of findby transaction id and customer type
router.route("/:id")
  .get(controller.findById)
  .put(controller.update)
  .delete(controller.remove);

// Matches with "/api/transactions/users
// Not currently in use
router.route("/users")
  .post(controller.createUser);

// Matches with "/api/transactions/auth
router.route("/auth")
  .post(passport.authenticate('google-token', { session: true }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };

    next();
  });

module.exports = router;