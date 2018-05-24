// Written by John R. Thurlby May 2018

module.exports = function(sequelize, DataTypes) {
  var Todolists = sequelize.define("Todolists", {
    todoitem: DataTypes.STRING,
    tododone: DataTypes.BOOLEAN,
    phonenumber: DataTypes.STRING,
    textdate: DataTypes.STRING,
    textsent: DataTypes.BOOLEAN
  });
  return Todolists;
};

