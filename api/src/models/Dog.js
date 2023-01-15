const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUIDV1,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
    },
    weight:{
      type: DataTypes.STRING
    },
    life_span:{
      type: DataTypes.NUMBER,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDataBase: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true,
      }
  });
};
