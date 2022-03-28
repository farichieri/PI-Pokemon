const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: { 
      type: DataTypes.UUID, // El tipo UUID genera un numero random con letras y numeros que no se repite.-
      defaultValue: DataTypes.UUIDV4, // Me genera automáticamente un UUIDV4.-
      primaryKey: true, // Va a ser la clave primaria: el ID.-
      allowNull: false // No te permito que este vacío.-
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img : {
      type : DataTypes.STRING,
      // allowNull: false,
      defaultValue: 'https://cdn-icons-png.flaticon.com/512/634/634741.png' // Ver si la cambio
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
