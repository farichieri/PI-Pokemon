const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const axios = require('axios');

router.get('/types', async (req, res, next)  => { // FUNCIONA
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
    const typesArray = await typesApi.data.results;
    
    typesArray.forEach(type => {
        Type.findOrCreate({
            where: {
                name: type.name
            }
        })
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
})


module.exports = router;
