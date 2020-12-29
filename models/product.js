'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    productName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Product name cannot be empty`
        }
      }
    },

    image_url: DataTypes.STRING,

    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `price cannot be empty`
        },
        min: {
          args: [1],
          msg: `price cannot be lower than 1`
        }
      }
    },

    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Stock cannot be empty`
        },
        min: {
          args: [1],
          msg: `Stock cannot be lower than 1`
        }
      }
    },

    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        }
      }
    },

    availableSize: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};