const router = require("express").Router();
const transactionRoutes = require("./transactions");

// Transaction routes
router.use("/transactions", transactionRoutes);

module.exports = router;
