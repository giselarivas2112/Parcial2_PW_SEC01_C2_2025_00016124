const cuentas = require("../../data/cuentas.json");

function getCuentas(req, res) {
    const q = req.query.queryParam;

    if (!q) {
        return res.json({
            count: cuentas.length,
            data: cuentas
        });
    }

    const qLower = q.toString().toLowerCase();

    const byId = cuentas.find(c => c.id === q);
    if (byId) {
        return res.json({ finded: true, account: byId });
    }

    const byGender = cuentas.filter(c => c.gender && c.gender.toLowerCase() === qLower);
    if (byGender.length > 0) {
        return res.json({ finded: true, data: byGender });
    }

    const byName = cuentas.filter(c => c.client && c.client.toLowerCase().includes(qLower));
    if (byName.length === 1) {
        return res.json({ finded: true, account: byName[0] });
    } else if (byName.length > 1) {
        return res.json({ finded: true, data: byName });
    }

    return res.json({
        finded: false,
        message: "No se encontró ninguna cuenta con ese parámetro."
    });
}

function getCuentaById(req, res) {
    const id = req.params.id;
    const account = cuentas.find(c => c.id === id);

    if (account) {
        return res.json({ finded: true, account });
    } else {
        return res.json({ finded: false, account: null });
    }
}

function getCuentasBalance(req, res) {
    const activas = cuentas.filter(c => c.isActive);
    const total = activas.reduce((sum, c) => sum + (c.balance || 0), 0);

    res.json({
        status: activas.length > 0,
        accountBalance: total
    });
}

module.exports = { getCuentas, getCuentaById, getCuentasBalance };
