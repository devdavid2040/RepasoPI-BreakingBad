

/*
https://breakingbadapi.com/api/characters

[
  {
    "char_id": 1,
    "name": "Walter White",
    "birthday": "09-07-1958",
    "occupation": [
      "High School Chemistry Teacher",
      "Meth King Pin"
    ],
    "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
    "status": "Presumed dead",
    "nickname": "Heisenberg",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "Bryan Cranston",
    "category": "Breaking Bad",
    "better_call_saul_appearance": [
      
    ]
  },
  { ... */


/* const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  });
};
 */


const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  });
};
