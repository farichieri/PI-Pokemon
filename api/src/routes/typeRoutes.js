const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const axios = require('axios');

router.get('/types', async (req, res)  => {
    try {
        const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
        const typesArray = await typesApi.data.results;
        typesArray.forEach(types => {
            Type.findOrCreate({
                where: { name: types.name }
            })
        });
        const allTypes = await Type.findAll();
        res.send(allTypes);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
