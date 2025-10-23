const express = require("express");
const app = express();
const port = 3130;

app.use(express.json());

const cuentasRoutes = require("./routes/cuentasRoutes");
app.use("/", cuentasRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando. Usa /cuentas, /cuenta/:id, /cuentasBalance o /cuentas?queryParam=valor");
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
