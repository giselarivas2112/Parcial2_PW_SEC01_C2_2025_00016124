const express = require("express");
const router = express.Router();
const controller = require("../controllers/cuentasController");

router.get("/cuentas", controller.getCuentas);
router.get("/cuenta/:id", controller.getCuentaById);
router.get("/cuentasBalance", controller.getCuentasBalance);

module.exports = router;
