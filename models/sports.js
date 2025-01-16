"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // static addSport(name){
    //   return Sports.create({name:name});
    // }

    static removeSport(name) {
      return Sports.destroy({ where: { name: name } });
    }

    static select() {
      return Sports.findAll();
    }
  }
  Sports.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sports",
    }
  );
  return Sports;
};
