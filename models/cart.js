'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    productName: DataTypes.STRING,
    image_url: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    checkout: DataTypes.BOOLEAN,
    deliveryFee: DataTypes.INTEGER,
    deliveryService: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate(value){
        if (!value.status) {
          value.status = "unpaid"
        }
        value.checkout = false
        value.paymenMenthod = 'bank transfer'
        value.totalAmount = value.amount * value.price
      }
    }
  });
  return Cart;
};