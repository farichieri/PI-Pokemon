const getApiInfo = require('./getApiInfo');
const getDbInfo = require('./getDbInfo');

const getAllInfo = async () => {
    const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDbInfo()]); 

    const allPokemonsInfo = apiInfo.concat(dbInfo);
    return allPokemonsInfo;
}

// Otra forma:
// const getAllInfo = async () =>  {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal
// }

module.exports = {getAllInfo};