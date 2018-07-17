const router = require("express").Router();
const transactionRoutes = require("./transactions");

// Article routes
router.use("/transactions", transactionRoutes);

module.exports = router;
