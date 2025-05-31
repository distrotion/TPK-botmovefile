const express = require("express");
const router = express.Router();

//BP12_G_REPORT

router.use(require("./flow/001/MOVE"))

router.use(require("./flow/testflow/testflow"))

module.exports = router;

