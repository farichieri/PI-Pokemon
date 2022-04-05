const getApiInfo = require('./getApiInfo');
const getDbInfo = require('./getDbInfo');

const getAllInfo = async () => {
    const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDbInfo()]); 

    const allPokemonsInfo = apiInfo.concat(dbInfo);
    return allPokemonsInfo;
}

module.exports = {getAllInfo};