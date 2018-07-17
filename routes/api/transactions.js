const router = require("express").Router();
const controller = require("../../controller/controller");

// Matches with "/api/transactions"
router.route("/")
  .get(controller.findAll)
  .post(controller.create);

// Matches with "/api/transactions/:id"
// Will need to add condition of findby transaction id and customer type
router
  .route("/:id")
  .get(controller.findById)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;