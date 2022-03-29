const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const axios = require('axios');

router.get('/types', async (req, res)  => { // FUNCIONA
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type') // Entra a la API
    const typesArray = await typesApi.data.results; // Agarra la info dentro del array results.
    typesArray.forEach(types => { // Entra al modelo y le dice encontrala o creala si no la tenes a cada type
        Type.findOrCreate({       // En donde el nombre sea ese elemento q me pasan
            where: { name: types.name }
        })
    });
    const allTypes = await Type.findAll(); // una vez hecho todo, entrá a Type, traeme todo y mandamelo
    res.send(allTypes);
})
// Si tengo el force seteado en false, lo va a traer todo directamente. 
// Si está en true, lo vuelve a hacer cada vez que levanto el back.-
// NO hace falta usar try catch con async await.-

module.exports = router;
