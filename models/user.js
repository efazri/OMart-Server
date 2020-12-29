'use strict';
const bcryptjs = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, { through : 'Carts' })
    }
  };
  User.init({
    name: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name cannot be empty`
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email cannot be empty`
        }
      }
    
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `password cannot be empty`
        }
      }
    
    },

    role: DataTypes.STRING,

    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Address cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(value){
        if(!value.role) value.role = 'costumer'

        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(value.password, salt)
        value.password = hash
      }
    }
  });
  return User;
};