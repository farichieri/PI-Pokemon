const { Router } = require('express');
const { Type } = require('../db')
const router = Router();

router.get('/types', async (req, res, next)  => {
    try {
        const type = await Type.findAll()
        res.send(type);
    } catch (error) {
        next(error);
    }
})


module.exports = router;
